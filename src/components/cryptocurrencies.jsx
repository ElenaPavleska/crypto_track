import React, { Component } from "react";
import CryptocurrenciesTable from "./cryptocurrenciesTable"
import { getCurrencies } from "../services/cryptocurrenciesService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import config from "../config.json";

class Cryptocurrencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: [],
            pageSize: 10,
            currentPage: 1
        };
    };

    componentDidMount() {
        this.loadData();
        this.interval = setInterval(async () => this.loadData(), 60000);
    };

    async loadData() {
        const { data } = await getCurrencies();
        const currencies = [ ...data.data];
        this.setState({ currencies });
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    handleInputAmount = (currency, e) => {
        e.preventDefault();

        const currencies = [...this.state.currencies];
        const index = currencies.indexOf(currency);
        currencies[index].amount = e.target.value;
        this.setState({ currencies });
    };

    handlePageChange = page => {
        this.setState({currentPage : page });
    };

    handleSubmitAmount = async currency => {
        const currencies = [...this.state.currencies];
        const index = currencies.indexOf(currency);

        const coin = currencies[index].amount * currencies[index].quote[config.convertCurrency].price;

        currencies[index].your_coin = coin;
        this.setState({ currencies });

        this.saveAmountInLocalStorage(currency.id, currency.amount);
        this.saveYourCoinInLocalStorage(currency.id, coin);
    };

    handleKeyPress = (currency, e) => {
       if(e.key === 'Enter') {
            const currencies = [...this.state.currencies];
            const index = currencies.indexOf(currency);
            currencies[index].amount = e.target.value;
            this.setState({currencies});
        }
    };

    saveAmountInLocalStorage = (currency_id, amount) => {
        localStorage.setItem(config.amountLocalStorageKeyPrefix + currency_id, amount);
    };

    saveYourCoinInLocalStorage = (currency_id, value) => {
        localStorage.setItem(config.coinValueLocalStorageKeyPrefix + currency_id, value);
    };

    render() {
        const { length: count } = this.state.currencies;
        const { pageSize, currentPage, currencies: allCurrencies } = this.state;

        const currencies = paginate(allCurrencies, currentPage, pageSize);

        return (
            <React.Fragment>
                <h2 className="text-success">Cryptocurrencies</h2>
                <CryptocurrenciesTable
                    currencies={ currencies }
                    onUpdateAmount={this.handleSubmitAmount}
                    onInputAmount={this.handleInputAmount}
                    onKeyPress={this.handleKeyPress}
                />
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Cryptocurrencies;
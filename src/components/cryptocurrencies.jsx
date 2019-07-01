import React, { Component } from "react";
// import http from "../services/httpService";
import CryptocurrenciesTable from "./cryptocurrenciesTable"
import { getCurrencies } from "../services/cryptocurrenciesService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Cryptocurrencies extends Component {
    state = {
        currencies: [],
        pageSize: 10,
        currentPage: 1,
        value: 0,
        inputCurrency: ''
    };

    async componentDidMount() {
        const { data } = await getCurrencies();
        const currencies = [ ...data.data];
        this.setState({ currencies });
    };

    handlePageChange = page => {
        this.setState({currentPage : page });
    };

    handleUpdate = async currency => {
        const currencies = [...this.state.currencies];
        const index = currencies.indexOf(currency);
        currencies[index].your_coin = currencies[index].amount * currencies[index].quote.USD.price;
        this.setState({ currencies });
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
                    onUpdate={this.handleUpdate}
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
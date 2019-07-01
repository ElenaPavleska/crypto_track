import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "../services/httpService";
import "react-toastify/dist/ReactToastify.css";
import CryptocurrenciesTable from "./cryptocurrenciesTable"
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
        var config = {
            headers: {
                "X-CMC_PRO_API_KEY": "0b90ded0-dca8-4265-8153-36c95423bc16",
                "Accept": "application/json"
            }
        };
        await http.get('https://cors-anywhere.herokuapp.com/' + 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=USD', config)
            .then(response => {
                this.setState({currencies : response.data.data});
            })
    }

    handleOpenDetails = (id, e) => {
        e.preventDefault();
        this.props.history.replace(`/cryptocurrencies/${id}`);
    };

    handleInputCurrency = (currency, e) => {
        const input = e.target;
        console.log(currency);
        currency.testValue = 565;
        //this.setState({ [state.inputCurrency]: input });
    };

    handlePageChange = page => {
        this.setState({currentPage : page });
    }

    render() {
        const { length: count } = this.state.currencies;
        const { pageSize, currentPage, currencies: allCurrencies } = this.state;

        const currencies = paginate(allCurrencies, currentPage, pageSize);

        return (
            <React.Fragment>
                <ToastContainer />
                <p>Showing { count } Cryptocurrencies in the database.</p>
                <CryptocurrenciesTable
                    currencies={ currencies }
                    onOpenDetails={this.handleOpenDetails}
                    onInputCurrency={this.handleInputCurrency}
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
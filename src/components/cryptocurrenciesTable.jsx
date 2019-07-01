import React, {Component} from 'react';
import Table from "./common/table";
import { Link } from "react-router-dom";
import config from "../config.json";

class CryptocurrenciesTable extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                path: "name",
                label: "Name",
                content: currency => <Link to={`/cryptocurrencies/${currency.id}`}>{currency.name}</Link>
            },
            {
                path: "symbol",
                label: "Short Name",
            },
            {
                path: "quote." + config.convertCurrency + ".price",
                label: "$ Value",
            },
            {
                path: "quote." + config.convertCurrency + ".percent_change_24h",
                label: "last 24h",
                content: currency => <span
                    className={currency.quote[config.convertCurrency].percent_change_24h < 0 ? "text-danger" : "text-success"}>{currency.quote[config.convertCurrency].percent_change_24h} %</span>
            },
            {
                path: "amount",
                label: "Amount you own",
                content: currency => <div className="cryptotable-amount">
                    <input
                        type="number"
                        name="inputCurrency"
                        className="form-control"
                        onChange={(e) => this.props.onInputAmount(currency, e)}
                        defaultValue={this.formatAmount(currency)}
                        onKeyPress={(e) => this.props.onKeyPress(currency, e)}
                    />
                    <button
                        type="button"
                        disabled={!currency.amount}
                        className="btn btn-secondary cryptotable-amount-button"
                        onClick={() => { this.props.onUpdateAmount(currency) }}
                    >
                        Submit
                    </button>
                </div>
            },
            {
                path: "your_coin",
                label: "$ your coin",
                content: currency => <span> $ {this.formatYourCoin(currency)} </span>
            },
        ];
    }

    formatAmount = (currency) => {
        if(localStorage.getItem(config.amountLocalStorageKeyPrefix + currency.id)) {
            return localStorage.getItem(config.amountLocalStorageKeyPrefix + currency.id);
        }

        return null;
    };

    formatYourCoin = (currency) => {
        if(currency.your_coin) {
            return currency.your_coin;
        } else if(localStorage.getItem(config.coinValueLocalStorageKeyPrefix)) {
            return localStorage.getItem(config.coinValueLocalStorageKeyPrefix);
        } else if(this.formatAmount(currency)) {
            return this.formatAmount(currency) * currency.quote[config.convertCurrency].price;
        }
        return  0;
    };

    render() {
        const { currencies, onUpdateAmount, onInputAmount, onKeyPress } = this.props;

        return (
            <Table
                columns={this.columns}
                data={currencies}
            />
        );
    }
}

export default CryptocurrenciesTable;
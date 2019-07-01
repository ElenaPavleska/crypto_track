import React, {Component} from 'react';
import Table from "./common/table";
import { Link } from "react-router-dom";

class CryptocurrenciesTable extends Component {

    columns = [
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
            path: "quote.USD.price",
            label: "$ Value",
        },
        {
            path: "quote.USD.percent_change_24h",
            label: "last 24h",
            content: currency => <span className={currency.quote.USD.percent_change_24h < 0 ? "text-danger" : "text-success"}>{currency.quote.USD.percent_change_24h} %</span>
        },
        {
            path: "amount",
            label: "Amount you own",
            content: currency => <div>
                                    <input type="number" name="inputCurrency" className="form-control" onChange={(e) => this.handleInput(currency, e)} defaultValue={this.formatAmount(currency)}/>
                                    <button type="button" className="btn btn-secondary" onClick={() => {this.props.onUpdate(currency)}}>Submit</button>
                                </div>
        },
        {
            path: "your_coin",
            label: "$ your coin",
            content: currency => <span> $ {this.formatYourCoin(currency)} </span>
        },
    ];

    handleInput = (currency, e) => {
        console.log('sdcds');
        currency.amount = e.target.value;
    };

    formatAmount = (currency) => {
        if(localStorage.getItem('currency_amount_' + currency.id)) {
            return localStorage.getItem('currency_amount_' + currency.id);
        }

        return null;
    };

    formatYourCoin = (currency) => {
        if(currency.your_coin === undefined && !this.formatAmount(currency)) {
            return 0;
        } else if(currency.your_coin) {
            return  currency.your_coin;
        }

        return this.formatAmount(currency) * currency.quote.USD.price;
    };

    render() {
        const { currencies, onUpdate } = this.props;

        return (
            <Table
                columns={this.columns}
                data={currencies}
            />
        );
    }
}

export default CryptocurrenciesTable;
import React, { Component } from "react";
import * as fakeCurrencies from "../sevices/fakeCryptocurrenciesService";

class Cryptocurrencies extends Component {
    state = {
        currencies: fakeCurrencies.getData()
    };

    render() {

        const { length: count } = this.state.currencies;
        if (this.state.currencies.length === 0)
            return <p>There are no Cryptocurrencies in the database.</p>;

        return (
            <React.Fragment>
                <p>Showing { count } Cryptocurrencies in the database.</p>
                <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Short Name</th>
                        <th>$ Value</th>
                        <th>last 24h</th>
                        <th>Amount you own</th>
                        <th></th>
                        <th>$ value of your coin</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.currencies.map(currency =>
                    <tr key={currency.id}>
                        <td>{currency.name}</td>
                        <td>{currency.symbol}</td>
                        <td>{currency.quote.price}</td>
                        <td>{currency.quote.percent_change_24h}</td>
                        <td><input type="number" className="form-control"/></td>
                        <td><button type="button" className="btn btn-secondary">Submit</button></td>
                        <td>00.00</td>
                    </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
        );
    }
}

export default Cryptocurrencies;
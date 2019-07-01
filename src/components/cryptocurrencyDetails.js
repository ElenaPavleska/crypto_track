import React, { Component } from "react";
import http from "../services/httpService";
import {getCurrencyDetails} from "../services/cryptocurrenciesService";

class CryptocurrencyDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: []
        };
    }

    async componentDidMount() {
        let currencyId = this.props.match.params.id;
        const { data } = await getCurrencyDetails(currencyId);
        const currency = data.data[currencyId];
        this.setState({ currency });
    }


    render() {
        return (
            <div className="container">
                <h2 className="text-muted">Currency name: </h2>
                <img alt={this.state.currency.name} src={this.state.currency.logo}/>
                <h2 className="display-4 text-success">
                    {this.state.currency.name}
                </h2>
                <hr/>
                <ul>
                    <li><span>symbol: <b>{this.state.currency.symbol}</b></span></li>
                    <li><span>slug: <b>{this.state.currency.slug}</b></span></li>
                    <li><span>date added: <b type="date">{this.state.currency.date_added}</b></span></li>
                    <li><span>tags: <b>{this.state.currency.tags}</b></span></li>
                    <li><span>category: <b>{this.state.currency.category}</b></span></li>
                </ul>
                <p>{this.state.currency.description}</p>
            </div>
        );
    }
}

export default CryptocurrencyDetails;

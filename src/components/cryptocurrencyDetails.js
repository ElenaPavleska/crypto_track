import React, { Component } from "react";
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
        const { data } = await getCurrencyDetails(currencyId).then();
        const currency = data.data[currencyId];
        this.setState({ currency });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="crypto-details">
                        <img
                            className="crypto-details-logo"
                            alt={this.state.currency.name}
                            src={this.state.currency.logo}
                        />
                        <h2 className="crypto-details-title">
                            {this.state.currency.name}
                        </h2>
                    </div>
                    <hr/>
                    <ul className="crypto-details-list">
                        <li><span>symbol: <b>{this.state.currency.symbol}</b></span></li>
                        <li><span>slug: <b>{this.state.currency.slug}</b></span></li>
                        <li><span>date added: <b type="date">{this.state.currency.date_added}</b></span></li>
                        <li><span>tags: <b>{this.state.currency.tags}</b></span></li>
                        <li><span>category: <b>{this.state.currency.category}</b></span></li>
                    </ul>
                    <hr/>
                    <div className="crypto-plus-details">
                        <p>{this.state.currency.description}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CryptocurrencyDetails;

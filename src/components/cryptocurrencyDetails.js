import React, { Component } from "react";
import http from "../services/httpService";

class cryptocurrencyDetails extends Component {

    state = {
        currency: []
    };

    async componentDidMount() {

        var crypto_id = this.props.match.params.id;
        var config = {
            headers: {
                "X-CMC_PRO_API_KEY": "0b90ded0-dca8-4265-8153-36c95423bc16",
                "Accept": "application/json"
            }
        };

        await http.get('https://cors-anywhere.herokuapp.com/' + 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + crypto_id, config)
            .then(response => {
                this.setState({currency : response.data.data[crypto_id]});
            })
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

export default cryptocurrencyDetails;

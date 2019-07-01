import React, {Component} from 'react';


class CryptocurrenciesTable extends Component {


    render() {
        const { currencies, onOpenDetails, onInputCurrency } = this.props;

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>$ Value</th>
                    <th>last 24h</th>
                    <th>Amount you own</th>
                    <th>$ value of your coin</th>
                </tr>
                </thead>
                <tbody>
                {currencies.map(currency => (
                    <tr key={currency.id}>
                        <td onClick={(e) => onOpenDetails(currency.id, e)}>{currency.name}</td>
                        <td>{currency.symbol}</td>
                        <td>{currency.quote.USD.price}</td>
                        <td>{currency.quote.USD.percent_change_24h}</td>
                        <td>
                            <form>
                                <input type="number" name="inputCurrency" className="form-control" onChange={(e) => onInputCurrency(currency, e)} />
                                <button type="button" className="btn btn-secondary">Submit</button>
                            </form>
                        </td>
                        <td>{currency.testValue ? currency.testValue : 0.0 }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default CryptocurrenciesTable;
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import  Cryptocurrencies  from "./components/cryptocurrencies";
import  CryptocurrencyDetails  from "./components/cryptocurrencyDetails";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                {/*<NavBar />*/}
                <main className="container">
                    <Switch>
                        <Route path="/cryptocurrencies/:id" component={CryptocurrencyDetails} />
                        <Route path="/cryptocurrencies" component={Cryptocurrencies} />
                        <Redirect from="/" exact to="/cryptocurrencies" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
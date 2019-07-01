import http from "./httpService";
// import { apiURL } from "../config.jason";

export function getCurrencies () {
    let config = {
        headers: {
            "X-CMC_PRO_API_KEY": "0b90ded0-dca8-4265-8153-36c95423bc16",
            "Accept": "application/json"
        }
    };
    return http.get("https://cors-anywhere.herokuapp.com/" + "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&convert=USD", config);
}

export function getCurrency (id) {
    let config = {
        headers: {
            "X-CMC_PRO_API_KEY": "0b90ded0-dca8-4265-8153-36c95423bc16",
            "Accept": "application/json"
        }
    };
    return http.get("https://cors-anywhere.herokuapp.com/" + "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info" + "?id=" + id, config);
}
import http from "./httpService";
import config from "../config.json";

export function getCurrencies (page = 1, limit = 50) {
    let envOptions = {
        headers: {
            "X-CMC_PRO_API_KEY": config.apiKey,
            "Accept": "application/json"
        }
    };

    const params = "sort=price&start=" + page + "&limit=" + limit + "&convert=" + config.convertCurrency;

    return http.get(config.proxyUrl +  config.apiUrl + "/v1/cryptocurrency/listings/latest?" + params, envOptions);
}

export function getCurrencyDetails (id) {
    let envOptions = {
        headers: {
            "X-CMC_PRO_API_KEY": config.apiKey,
            "Accept": "application/json"
        }
    };
    return http.get(config.proxyUrl + config.apiUrl  + "/v1/cryptocurrency/info" + "?id=" + id, envOptions);
}
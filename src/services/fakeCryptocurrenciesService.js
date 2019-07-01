const data = [
    {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        quote: { price: 11795.3198735, percent_change_24h: 0.480448 }
    },
    {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        quote: { price: 309.477928301, percent_change_24h: 2.77887 }
    }
];

export function getData() {
    return data;
}

export function getCryptocurrency(id) {
    return data.find(c => c.id === id);
}

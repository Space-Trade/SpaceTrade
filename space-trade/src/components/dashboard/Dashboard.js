import React from "react";
import { Link } from "react-router-dom";
import { relDiff, numberWithCommas } from "../helpers.js";
import Loader from "../elements/Loader";
import Chart from "./Chart.js";

const apiKeys = [
    "OYMIDLPTGY6CAMP0",
    "TVARN7J9F191IFLB",
    "NOBPQ2OPX7E1XRT3",
    "7V0Q0N46CBIPHA2K",
];

let chartData1 = [],
    chartData2 = [];

let stockSymbols = [],
    stockPrices = [],
    stockChanges = [],
    changesColors = [];

let stockList = [],
    stockListPrices = [],
    stockListTickers = [],
    stockListChange = [],
    stockListChangeColors = [];

let tempStocksSymbols = [],
    tempStockName = [],
    tempStockPrice = [];

let portfolioStocks = [],
    portfolioShares = [],
    portfolioValue = [],
    portfolioDifference = [],
    portfolioColor = [],
    portfolioMoneyPaid = [];

class Dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loader1: "",
            loader2: "",
            loader3: "",
            portfolioLoader: "",
            fundsWithoutCommas: "",
            accountValue: "",
            marketStatus: "",
            theme: "",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.portfolio = React.createRef();
        this.chartFirst = React.createRef();
        this.chartSecond = React.createRef();

        function labelGen(length) {
            let result = 0;
            for (let i = 1; i < length; i++) {
                result = result + "," + i;
            }
            return result.split(",");
        }

        this.data1 = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 600, 10);
            gradient.addColorStop(0, "#7c83ff");
            gradient.addColorStop(1, "#7cf4ff");
            let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
            gradientFill.addColorStop(0.1, "rgba(124, 131, 255,.3)");
            if (this.state.theme === "dark") {
                gradientFill.addColorStop(0.8, "rgba(55, 58, 70, 0)");
            } else if (this.state.theme === "light") {
                gradientFill.addColorStop(0.8, "rgba(255, 255, 255, 0)");
            }
            ctx.shadowColor = "rgba(124, 131, 255,.3)";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;
            return {
                labels: labelGen(chartData1.length),
                datasets: [
                    {
                        lineTension: 0.3,
                        label: "",
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        borderColor: gradient,
                        backgroundColor: gradientFill,
                        pointBackgroundColor: gradient,
                        fill: true,
                        borderWidth: 2,
                        data: chartData1,
                    },
                ],
            };
        };
        this.data2 = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 600, 10);
            gradient.addColorStop(0, "#7c83ff");
            gradient.addColorStop(1, "#7cf4ff");
            let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
            gradientFill.addColorStop(0.1, "rgba(124, 131, 255,.3)");
            if (this.state.theme === "dark") {
                gradientFill.addColorStop(0.8, "rgba(55, 58, 70, 0)");
            } else if (this.state.theme === "light") {
                gradientFill.addColorStop(0.8, "rgba(255, 255, 255, 0)");
            }
            ctx.shadowColor = "rgba(124, 131, 255,.3)";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;
            return {
                labels: labelGen(chartData2.length),
                datasets: [
                    {
                        lineTension: 0.3,
                        label: "",
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        borderColor: gradient,
                        backgroundColor: gradientFill,
                        pointBackgroundColor: gradient,
                        fill: true,
                        borderWidth: 2,
                        data: chartData2,
                    },
                ],
            };
        };
    }

    getChart(dataChart, symbol, callback) {
        let b = 0;
        const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[0]}`;
        fetch(stockApi)
            .then(res => res.json())
            .then(result => {
                if (
                    typeof result["Note"] === "undefined" &&
                    Object.keys(result["Time Series (1min)"]).length > 1
                ) {
                    for (
                        let i = Object.keys(result["Time Series (1min)"]).length - 1;
                        i > 0 || callback();
                        i--
                    ) {
                        dataChart.push(
                            parseFloat(
                                result["Time Series (1min)"][
                                Object.keys(result["Time Series (1min)"])[parseInt(i)]
                                ]["4. close"],
                            ).toFixed(2),
                        );
                    }
                } else {
                    if (typeof result["Note"] === "undefined") {
                        b++;
                        const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[parseInt(b)]
                            }`;
                        fetch(stockApi)
                            .then(res => res.json())
                            .then(result => {
                                if (
                                    typeof result["Note"] === "undefined" &&
                                    result.length > 1
                                ) {
                                    for (
                                        let i =
                                            Object.keys(result["Time Series (1min)"]).length - 1;
                                        i > 0 || callback();
                                        i--
                                    ) {
                                        dataChart.push(
                                            parseFloat(
                                                result["Time Series (1min)"][
                                                Object.keys(result["Time Series (1min)"])[parseInt(i)]
                                                ]["4. close"],
                                            ).toFixed(2),
                                        );
                                    }
                                }
                            });
                    } else {
                        if (typeof result["Note"] === "undefined" && result.length > 1) {
                            b++;
                            const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[parseInt(b)]
                                }`;
                            fetch(stockApi)
                                .then(res => res.json())
                                .then(result => {
                                    for (
                                        let i =
                                            Object.keys(result["Time Series (1min)"]).length - 1;
                                        i > 0 || callback();
                                        i--
                                    ) {
                                        dataChart.push(
                                            parseFloat(
                                                result["Time Series (1min)"][
                                                Object.keys(result["Time Series (1min)"])[parseInt(i)]
                                                ]["4. close"],
                                            ).toFixed(2),
                                        );
                                    }
                                });
                        }
                    }
                }
            });
    }
    getStockInfo(symbol, dataChart, changeStash, priceStash, num, callback) {
        const percentageChange = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
        if (typeof symbol !== "undefined") {
            fetch(percentageChange)
                .then(res => res.json())
                .then(result => {
                    if (result.latestPrice !== null) {
                        priceStash[parseInt(num)] = result.latestPrice.toFixed(2);
                    } else if (result.iexRealtimePrice !== null) {
                        priceStash[parseInt(num)] = result.iexRealtimePrice.toFixed(2);
                    }
                    if (result.changePercent !== null) {
                        changeStash[parseInt(num)] = parseFloat(
                            result.changePercent,
                        ).toFixed(2);
                    }
                });
            this.getChart(dataChart, symbol, callback);
        }
    }
    getStocksList() {
        const stocks = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
        fetch(stocks)
            .then(res => res.json())
            .then(result => {
                const gainers = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
                let counter = 0;
                fetch(gainers)
                    .then(res => res.json())
                    .then(result => {
                        for (let i = 0; i < result.length; i++) {
                            if (result[parseInt(i)].latestPrice !== null) {
                                tempStocksSymbols.push(result[parseInt(i)].symbol);
                                tempStockName.push(result[parseInt(i)].companyName);
                                tempStockPrice.push(
                                    `$${result[parseInt(i)].latestPrice.toFixed(2)}`,
                                );
                            }
                        }
                    })
                    .then(() => {
                        for (let i = 0; i < 9; i++) {
                            if (typeof result[parseInt(i)] !== "undefined") {
                                if (
                                    this.isInArray(
                                        stockSymbols,
                                        result[parseInt(i)].symbol.toString(),
                                    )
                                ) {
                                    stockList[parseInt(i)] = tempStockName[parseInt(counter)];
                                    stockListPrices[parseInt(i)] =
                                        tempStockPrice[parseInt(counter)];
                                    stockListTickers[parseInt(i)] =
                                        tempStocksSymbols[parseInt(counter)];
                                    counter++;
                                } else {
                                    stockList[parseInt(i)] = result[parseInt(i)].companyName;
                                    stockListPrices[parseInt(i)] = `$${result[
                                        parseInt(i)
                                    ].latestPrice.toFixed(2)}`;
                                    stockListTickers[parseInt(i)] = result[parseInt(i)].symbol;
                                }
                            }
                        }
                    })
                    .then(() => {
                        setTimeout(() => {
                            for (let i = 0; i < 9; i++) {
                                const percentageChange = `https://cloud.iexapis.com/stable/stock/${stockListTickers[parseInt(i)]}/quote?displayPercent=true&token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
                                if (typeof stockListTickers[parseInt(i)] !== "undefined") {
                                    fetch(percentageChange)
                                        .then(res => res.json())
                                        .then(result => {
                                            if (result.changePercent !== null) {
                                                stockListChange[parseInt(i)] = parseFloat(
                                                    result.changePercent,
                                                ).toFixed(2);
                                            } else {
                                                stockListChange[parseInt(i)] = "---";
                                            }
                                            if (Math.sign(stockListChange[parseInt(i)]) === -1) {
                                                stockListChangeColors[parseInt(i)] = "rgb(244,84,133";
                                            } else if (
                                                Math.sign(stockListChange[parseInt(i)]) === 1
                                            ) {
                                                stockListChangeColors[parseInt(i)] = "rgb(102,249,218";
                                                stockListChange[parseInt(i)] =
                                                    "+" + stockListChange[parseInt(i)];
                                                if (
                                                    stockListChange[parseInt(i)].charAt(0) === "+" &&
                                                    stockListChange[parseInt(i)].charAt(1) === "+"
                                                ) {
                                                    stockListChange[parseInt(i)] = stockListChange[
                                                        parseInt(i)
                                                    ].substr(1);
                                                }
                                            } else {
                                                stockListChangeColors[parseInt(i)] = "rgb(153,158,175";
                                            }
                                            if (stockListChange[parseInt(i)] !== "---") {
                                                stockListChange[parseInt(i)] =
                                                    stockListChange[parseInt(i)] + "%";
                                            }
                                        })
                                        .then(() => {
                                            setTimeout(() => {
                                                if (this._isMounted) {
                                                    this.setState({
                                                        loader3: true,
                                                    });
                                                }
                                            }, 900);
                                        });
                                }
                            }
                        }, 1000);
                    });
            });
    }

    getLatestPrice(symbol, i) {
        const lastPrice = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
        fetch(lastPrice)
            .then(res => res.json())
            .then(result => {
                portfolioValue[parseInt(i)] = parseFloat(
                    Number(portfolioShares[parseInt(i)] * result.latestPrice).toFixed(2),
                );
            })
            .then(() => {
                portfolioDifference[parseInt(i)] =
                    relDiff(
                        parseFloat(portfolioValue[parseInt(i)]),
                        parseFloat(portfolioMoneyPaid[parseInt(i)]),
                    ).toFixed(2) + "%";
                if (portfolioValue[parseInt(i)] > portfolioMoneyPaid[parseInt(i)]) {
                    portfolioDifference[parseInt(i)] =
                        "+" + portfolioDifference[parseInt(i)];
                    portfolioColor[parseInt(i)] = "#66F9DA";
                } else if (
                    portfolioValue[parseInt(i)] === portfolioMoneyPaid[parseInt(i)]
                ) {
                    portfolioColor[parseInt(i)] = "#999EAF";
                } else {
                    portfolioDifference[parseInt(i)] =
                        "-" + portfolioDifference[parseInt(i)];
                    portfolioColor[parseInt(i)] = "#F45385";
                }
                if (portfolioDifference[parseInt(i)].includes("NaN")) {
                    portfolioDifference[parseInt(i)] = "---";
                    portfolioColor[parseInt(i)] = "#999EAF";
                }
            });
    }

    isInArray(arr, val) {
        return arr.indexOf(val) > -1;
    }

    getGainers() {
        chartData1 = [];
        chartData2 = [];

        const gainers = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_d0e99ea2ee134a4f99d0a3ceb700336c`;
        fetch(gainers)
            .then(res => res.json())
            .then(result => {
                for (let i = 0; i < 4; i++) {
                    if (typeof result[parseInt(i)] !== "undefined") {
                        stockSymbols.push(result[parseInt(i)].symbol);
                    }
                }
                this.getStockInfo(
                    stockSymbols[0],
                    chartData1,
                    stockChanges,
                    stockPrices,
                    0,
                    () => {
                        let firstChart = this.chartFirst.current;
                        if (firstChart) {
                            setTimeout(() => {
                                if (
                                    typeof stockChanges[0] !== "undefined" &&
                                    typeof stockPrices[0] !== "undefined" &&
                                    chartData1.length >= 2 &&
                                    firstChart &&
                                    this._isMounted
                                ) {
                                    this.setState({
                                        loader1: true,
                                    });
                                    firstChart.href = "/stocks/" + stockSymbols[0];
                                } else if (this._isMounted) {
                                    this.setState({
                                        loader1: false,
                                    });
                                    if (firstChart) {
                                        firstChart.href = "#";
                                    }
                                }
                            }, 800);
                        }
                    },
                );
                this.getStockInfo(
                    stockSymbols[1],
                    chartData2,
                    stockChanges,
                    stockPrices,
                    1,
                    () => {
                        let secondChart = this.chartSecond.current;
                        setTimeout(() => {
                            if (secondChart) {
                                if (
                                    typeof stockChanges[1] !== "undefined" &&
                                    typeof stockPrices[1] !== "undefined" &&
                                    chartData2.length >= 2 &&
                                    this._isMounted
                                ) {
                                    this.setState({
                                        loader2: true,
                                    });
                                    secondChart.href = "/stocks/" + stockSymbols[1];
                                } else if (this._isMounted) {
                                    this.setState({
                                        loader2: false,
                                    });
                                    secondChart.href = "#";
                                }
                            }
                        }, 800);
                    },
                );
            });
    }

    componentDidMount() {
        this._isMounted = true;

        setInterval(() => {
            let theme = localStorage.getItem("theme");
            if (theme !== null && this._isMounted) {
                this.setState({ theme });
            } else if (this._isMounted) {
                this.setState({ theme: "dark" });
            }
        }, 500);

        if (this._isMounted) {
            fetch("https://financialmodelingprep.com/api/v3/is-the-market-open")
                .then(res => res.json())
                .then(result => {
                    if (this._isMounted) {
                        this.setState({
                            marketStatus: result.isTheStockMarketOpen,
                        });
                    }
                });

            this.getGainers();
            document.title = "SpaceTrade - Dashboard";
            this.getStocksList();

            setTimeout(() => {
                if (this.chartSecond.current && this.chartFirst.current) {
                    if (
                        typeof stockChanges[1] !== "undefined" &&
                        typeof stockPrices[1] !== "undefined" &&
                        chartData2.length >= 2 &&
                        this._isMounted
                    ) {
                        this.setState({
                            loader2: true,
                        });
                        this.chartSecond.current.href = "/stocks/" + stockSymbols[1];
                    } else if (this._isMounted) {
                        this.setState({
                            loader2: false,
                        });
                        this.chartSecond.current.href = "#";
                    }
                    if (
                        typeof stockChanges[0] !== "undefined" &&
                        typeof stockPrices[0] !== "undefined" &&
                        chartData1.length >= 2 &&
                        this._isMounted
                    ) {
                        this.setState({
                            loader1: true,
                        });
                        this.chartFirst.current.href = "/stocks/" + stockSymbols[0];
                    } else if (this._isMounted) {
                        this.setState({
                            loader1: false,
                        });
                        this.chartFirst.current.href = "#";
                    }
                    if (stockListChange < 3 && this._isMounted) {
                        this.setState({
                            loader3: false,
                        });
                    }
                    if (this.state.loader3 !== true && this._isMounted) {
                        this.setState({
                            loader3: false,
                        });
                    }
                    if (this.state.loader1 === "" && this._isMounted) {
                        this.setState({
                            loader1: false,
                        });
                    }
                    if (this.state.loader2 === "" && this._isMounted) {
                        this.setState({
                            loader2: false,
                        });
                    }
                }
            }, 5000);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        for (let i = 0; i < stockSymbols.length; i++) {
            if (Math.sign(stockChanges[parseInt(i)]) === -1) {
                changesColors[parseInt(i)] = "#f45485";
            } else if (Math.sign(stockChanges[parseInt(i)]) === 1) {
                changesColors[parseInt(i)] = "#66f9da";
                stockChanges[parseInt(i)] = "+" + stockChanges[parseInt(i)];
                if (
                    stockChanges[parseInt(i)].charAt(0) === "+" &&
                    stockChanges[parseInt(i)].charAt(1) === "+"
                ) {
                    stockChanges[parseInt(i)] = stockChanges[parseInt(i)].substr(1);
                }
            } else {
                changesColors[parseInt(i)] = "#999eaf";
            }

            if (document.getElementById("searchBar") === document.activeElement) {
                document.getElementById("topbar__searchbar").style.boxShadow =
                    "0px 0px 30px 0px rgba(0,0,0,0.10)";
                document.getElementById("results").style.boxShadow =
                    "0px 30px 20px 0px rgba(0,0,0,0.10)";
            }
        }
        return (
            <section className="Dashboard" id="dashboard">
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div className="panel">
                            <div className="panel__container">
                                <div className="panel__top">
                                    <div className="panel__title">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <svg
                                                className="panel__popular"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="48"
                                                height="48"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#5eb5f8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M3 3v18h18" />
                                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                                            </svg>
                                            <h3>Gainers</h3>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "33%",
                                            }}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="panel__portfolio-title"
                                                viewBox="0 0 24 24">
                                                <g>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M4.873 3h14.254a1 1 0 0 1 .809.412l3.823 5.256a.5.5 0 0 1-.037.633L12.367 21.602a.5.5 0 0 1-.706.028c-.007-.006-3.8-4.115-11.383-12.329a.5.5 0 0 1-.037-.633l3.823-5.256A1 1 0 0 1 4.873 3zm.51 2l-2.8 3.85L12 19.05 21.417 8.85 18.617 5H5.383z" />
                                                </g>
                                            </svg>
                                            <h3>Portfolio</h3>
                                        </div>
                                    </div>
                                    <div className="panel__topCharts" style={{ display: "flex" }}>
                                        <a
                                            ref={this.chartFirst}
                                            id="chartFirst"
                                            href="/"
                                            className="chartLink">
                                            <Chart
                                                loader={this.state.loader1}
                                                data={this.data1}
                                                stockSymbol={stockSymbols[0]}
                                                stockPrice={stockPrices[0]}
                                                stockChange={stockChanges[0]}
                                                changesColor={changesColors[0]}
                                            />
                                        </a>
                                        <a
                                            ref={this.chartSecond}
                                            id="chartSecond"
                                            href="/"
                                            className="chartLink">
                                            <Chart
                                                loader={this.state.loader1}
                                                data={this.data2}
                                                stockSymbol={stockSymbols[1]}
                                                stockPrice={stockPrices[1]}
                                                stockChange={stockChanges[1]}
                                                changesColor={changesColors[1]}
                                            />
                                        </a>
                                        <div className="panel__portfolio-section">
                                            <div
                                                className="panel__portfolio"
                                                ref={this.portfolio}
                                                id="portfolio">
                                                <div>
                                                    <table className="panel__portfolio-list">
                                                        <tbody>
                                                            <tr>
                                                                <th>SYMBOL</th>
                                                                <th>QUANTITY</th>
                                                                <th>GAIN/LOSS (%)</th>
                                                                <th>CURRENT VALUE</th>
                                                            </tr>
                                                            <tr>
                                                                <td>AAPL</td>
                                                                <td>1</td>
                                                                <td>-74.73%</td>
                                                                <td>$116.94</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel__low">
                                <div className="panel__bottom-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                fillRule="nonzero"
                                                d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.761 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462z"
                                            />
                                        </g>
                                    </svg>
                                    <h3>Most Active</h3>
                                </div>
                                {this.state.loader3 === true && (
                                    <div className="panel__bottom">
                                        <div className="panel__stockList">
                                            <ul className="panel__list">
                                                {stockList.map((value, index) => {
                                                    if (index < 3) {
                                                        return (
                                                            <li key={index}>
                                                                <Link
                                                                    to={
                                                                        "stocks/" +
                                                                        stockListTickers[parseInt(index)]
                                                                    }>
                                                                    <span className="panel__fullname">
                                                                        <h4>{stockListTickers[parseInt(index)]}</h4>
                                                                        <h6 className="panel__name">{value}</h6>
                                                                    </span>
                                                                    <div className="panel__list-change">
                                                                        <h4> {stockListPrices[parseInt(index)]}</h4>
                                                                        <h5
                                                                            style={{
                                                                                color:
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] + ")",
                                                                                margin: "5px 0 0 0",
                                                                                textShadow:
                                                                                    "0px 0px 7px " +
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] +
                                                                                    ",0.5)",
                                                                            }}>
                                                                            {stockListChange[parseInt(index)]}
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    } else {
                                                        return "";
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                        <div className="panel__stockList">
                                            <ul className="panel__list">
                                                {stockList.map((value, index) => {
                                                    if (index >= 3 && index < 6) {
                                                        return (
                                                            <li key={index}>
                                                                <Link
                                                                    to={
                                                                        "stocks/" +
                                                                        stockListTickers[parseInt(index)]
                                                                    }>
                                                                    <span className="panel__fullname">
                                                                        <h4>{stockListTickers[parseInt(index)]}</h4>
                                                                        <h6 className="panel__name">{value}</h6>
                                                                    </span>
                                                                    <div className="panel__list-change">
                                                                        <h4> {stockListPrices[parseInt(index)]}</h4>
                                                                        <h5
                                                                            style={{
                                                                                color:
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] + ")",
                                                                                margin: "5px 0 0 0",
                                                                                textShadow:
                                                                                    "0px 0px 7px " +
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] +
                                                                                    ",0.5)",
                                                                            }}>
                                                                            {stockListChange[parseInt(index)]}
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    } else {
                                                        return "";
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                        <div className="panel__stockList">
                                            <ul className="panel__list">
                                                {stockList.map((value, index) => {
                                                    if (index >= 6) {
                                                        return (
                                                            <li key={index}>
                                                                <Link
                                                                    to={
                                                                        "stocks/" +
                                                                        stockListTickers[parseInt(index)]
                                                                    }>
                                                                    <span className="panel__fullname">
                                                                        <h4>{stockListTickers[parseInt(index)]}</h4>
                                                                        <h6 className="panel__name">{value}</h6>
                                                                    </span>
                                                                    <div className="panel__list-change">
                                                                        <h4> {stockListPrices[parseInt(index)]}</h4>
                                                                        <h5
                                                                            style={{
                                                                                color:
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] + ")",
                                                                                margin: "5px 0 0 0",
                                                                                textShadow:
                                                                                    "0px 0px 7px " +
                                                                                    stockListChangeColors[
                                                                                    parseInt(index)
                                                                                    ] +
                                                                                    ",0.5)",
                                                                            }}>
                                                                            {stockListChange[parseInt(index)]}
                                                                        </h5>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        );
                                                    } else {
                                                        return "";
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )}{" "}
                                {this.state.loader3 === "" && <Loader />}
                                {this.state.loader3 === false && (
                                    <div className="errorMsg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                                            </g>
                                        </svg>
                                        <p>Couldn't load list try again in few minutes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;

import * as React from "react";
import { Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "chartjs-plugin-annotation";
import News from "./News.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import FullChart from "./FullChart";
import KeyInfo from "./KeyInfo";
import { defaults } from "react-chartjs-2";
import {keyList} from "../../data/apiKeys"

defaults.global.defaultFontStyle = "Bold";
defaults.global.defaultFontFamily = "Quantico";
defaults.global.animation.duration = 200;

var options = {
    layout: {
        padding: {
            right: 25,
            left: 25,
        },
    },
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label(tooltipItems, data) {
                return `$${tooltipItems.yLabel}`;
            },
        },
        displayColors: false,
    },
    hover: {
        mode: "index",
        intersect: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            },
        ],
        fontStyle: "bold",
        yAxes: [
            {
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                fontStyle: "bold",

                ticks: {
                    callback(value) {
                        return "$" + value.toFixed(2);
                    },
                },
            },
        ],
    },
    elements: {
        point: {
            radius: 0,
        },
        line: {
            borderCapStyle: "round",
            borderJoinStyle: "round",
        },
    },
};

const API_KEY = keyList[7];

const apiKeys = [
    "SAOS0Y8B63XM4DPK",
    "4LPH6E70R1XQR2L5",
    "NOBPQ2OPX7E1XRT3",
    "7V0Q0N46CBIPHA2K",
];

let symbol;

// CHARTS
let chartData1 = [];
let labels = [];
let symbolsOnly = [];
let closePrice;
let stockData = {};
let keyData = [];
let keyDataLabel = [];
let allSymbols = [];
let twoYears = [];
let twoYearsLabels = [];
let oneYear = [];
let oneYearLabels = [];
let ytdChart = [];
let ytdLabels = [];
let oneMonth = [];
let oneMonthLabels = [];
let oneDay = [];
let oneDayLabels = [];

export default class Stock extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loaded: "",
            fundsWithoutCommas: "",
            accountValue: "",
            changeColor: "",
            extendedColor: "",
            marketStatus: "",
            valid: "",
            latestPrice: "",
            buyConfirmation: "",
        };
        this.results = React.createRef();
        this.buyInput = React.createRef();
        this.searchBar = React.createRef();
        this.searchBarEl = React.createRef();
        this.day = React.createRef();
        this.month = React.createRef();
        this.year = React.createRef();
        this.years = React.createRef();
        this.ytd = React.createRef();

        this.changeFocus = this.changeFocus.bind(this);
        this.getYTDChart = this.getYTDChart.bind(this);
        this.getOneMonthChart = this.getOneMonthChart.bind(this);
        this.getOneYearChart = this.getOneYearChart.bind(this);
        this.getTwoYearChart = this.getTwoYearChart.bind(this);
        this.getOneDayChart = this.getOneDayChart.bind(this);

        this.data1 = canvas => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 600, 10);
            gradient.addColorStop(0, "rgb(108, 148, 213)");
            gradient.addColorStop(1, "rgb(91, 207, 220)");
            let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
            gradientFill.addColorStop(0.1, "rgba(108, 148, 213, 0.2)");
			gradientFill.addColorStop(0.9, "rgb(91, 207, 220, 0)")
            // ctx.shadowColor = "rgba(56, 162, 173, 0.7)";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
            return {
                labels,
                datasets: [
                    {
                        lineTension: 0.1,
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
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getOneDayChart() {
        const anno = {
            annotations: [
                {
                    borderDash: [2, 2],
                    drawTime: "afterDatasetsDraw",
                    type: "line",
                    mode: "horizontal",
                    scaleID: "y-axis-0",
                    value: closePrice,
                    borderColor: "#676976",
                    borderWidth: 1,
                },
            ],
        };
        labels = [];
        chartData1 = [];
        let b = 0;
        if (oneDay.length === 0) {
            const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[0]}`;
            fetch(stockApi)
                .then(res => res.json())
                .then(result => {
                    if (typeof result["Note"] === "undefined") {
                        for (let i = Object.keys(result["Time Series (1min)"]).length - 1; i > 0; i--) {
                            chartData1.push(
                                parseFloat(
                                    result["Time Series (1min)"][
                                    Object.keys(result["Time Series (1min)"])[parseInt(i)]
                                    ]["4. close"],
                                ).toFixed(2),
                            );
                            labels.push(
                                Object.keys(result["Time Series (1min)"])
                                [parseInt(i)].split(" ")[1]
                                    .slice(0, -3),
                            );
                        }
                    } else {
                        setTimeout(() => {
                            b++;
                            const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[parseInt(b)]}`;
                            fetch(stockApi)
                                .then(res => res.json())
                                .then(result => {
                                    for (let i = Object.keys(result["Time Series (1min)"]).length - 1; i > 0; i--) {
                                        chartData1.push(
                                            parseFloat(
                                                result["Time Series (1min)"][
                                                Object.keys(result["Time Series (1min)"])[parseInt(i)]
                                                ]["4. close"],
                                            ).toFixed(2),
                                        );
                                        labels.push(Object.keys(result["Time Series (1min)"])[parseInt(i)].split(" ")[1].slice(0, -3),);
                                    }
                                });
                        }, 500);
                    }
                })
                .then(() => {
                    setTimeout(() => {
                        if (this._isMounted) {
                            this.setState({
                                loaded: true,
                            });
                            chartData1.map(val => oneDay.push(val));
                            labels.map(val => oneDayLabels.push(val));
                        }
                    }, 1000);
                });
        } else {
            labels = oneDayLabels;
            chartData1 = oneDay;
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                });
            }
        }
        options.annotation = anno;
    }

    getYTDChart() {
        labels = [];
        chartData1 = [];
        if (ytdChart.length === 0) {
            const stockApi = `https://cloud.iexapis.com/beta/stock/${symbol}/batch?token=${API_KEY}&types=chart,quote&range=ytd`;
            fetch(stockApi)
                .then(res => res.json())
                .then(result => {
                    for (let i = 0; i < result.chart.length; i++) {
                        if (result.chart[parseInt(i)].average !== null) {
                            chartData1.push(result.chart[parseInt(i)].close.toFixed(2));
                            labels.push(result.chart[parseInt(i)].label);
                        }
                    }
                })
                .then(() => {
                    if (this._isMounted) {
                        this.setState({
                            loaded: true,
                        });

                        chartData1.map(val => ytdChart.push(val));
                        labels.map(val => ytdLabels.push(val));
                    }
                });
        } else {
            labels = ytdLabels;
            chartData1 = ytdChart;
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                });
            }
        }
        options.annotation = "";
    }

    getOneYearChart() {
        labels = [];
        chartData1 = [];
        if (oneYear.length === 0) {
            const stockApi = `https://cloud.iexapis.com/beta/stock/${symbol}/batch?token=${API_KEY}&types=chart,quote&range=1y`;
            fetch(stockApi)
                .then(res => res.json())
                .then(result => {
                    for (let i = 0; i < result.chart.length; i++) {
                        if (result.chart[parseInt(i)].average !== null) {
                            chartData1.push(result.chart[parseInt(i)].close.toFixed(2));
                            labels.push(result.chart[parseInt(i)].label);
                        }
                    }
                })
                .then(() => {
                    if (this._isMounted) {
                        this.setState({
                            loaded: true,
                        });
                    }
                    chartData1.map(val => oneYear.push(val));
                    labels.map(val => oneYearLabels.push(val));
                });
        } else {
            labels = oneYearLabels;
            chartData1 = oneYear;
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                });
            }
        }
        options.annotation = "";
    }

    getTwoYearChart() {
        labels = [];
        chartData1 = [];
        if (twoYears.length === 0) {
            const stockApi = `https://cloud.iexapis.com/beta/stock/${symbol}/batch?token=${API_KEY}&types=chart,quote&range=2y`;
            fetch(stockApi)
                .then(res => res.json())
                .then(result => {
                    for (let i = 0; i < result.chart.length; i++) {
                        if (result.chart[parseInt(i)].average !== null) {
                            chartData1.push(result.chart[parseInt(i)].close.toFixed(2));
                            labels.push(result.chart[parseInt(i)].label);
                        }
                    }
                })
                .then(() => {
                    if (this._isMounted) {
                        this.setState({
                            loaded: true,
                        });
                    }
                    chartData1.map(val => twoYears.push(val));
                    labels.map(val => twoYearsLabels.push(val));
                });
        } else {
            labels = twoYearsLabels;
            chartData1 = twoYears;
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                });
            }
        }
        options.annotation = "";
    }

    getOneMonthChart() {
        labels = [];
        chartData1 = [];
        if (oneMonth.length === 0) {
            const stockApi = `https://cloud.iexapis.com/beta/stock/${symbol}/batch?token=${API_KEY}&types=chart,quote&range=1m`;
            fetch(stockApi)
                .then(res => res.json())
                .then(result => {
                    for (let i = 0; i < result.chart.length; i++) {
                        if (result.chart[parseInt(i)].average !== null) {
                            chartData1.push(result.chart[parseInt(i)].close.toFixed(2));
                            labels.push(result.chart[parseInt(i)].label);
                        }
                    }
                })
                .then(() => {
                    if (this._isMounted) {
                        this.setState({
                            loaded: true,
                        });
                    }
                    chartData1.map(val => oneMonth.push(val));
                    labels.map(val => oneMonthLabels.push(val));
                });
        } else {
            labels = oneMonthLabels;
            chartData1 = oneMonth;
            if (this._isMounted) {
                this.setState({
                    loaded: true,
                });
            }
        }
        options.annotation = "";
    }

    abbrNum(number, decPlaces) {
        decPlaces = Math.pow(10, decPlaces);
        var abbrev = ["k", "m", "b", "t"];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round((number * decPlaces) / size) / decPlaces;
                if (number === 1000 && i < abbrev.length - 1) {
                    number = 1;
                    i++;
                }
                number += abbrev[parseInt(i)];
                break;
            }
        }

        return number;
    }

    isInArray(arr, val) {
        return arr.indexOf(val) > -1;
    }

    changeFocus(option) {
        setTimeout(
            function () {
                var elems = document.querySelectorAll(".Chart__option");

                [].forEach.call(elems, function (el) {
                    el.classList.remove("active");
                });
                switch (option) {
                    case 1:
                        this.day.current.classList.add("active");
                        break;

                    case 2:
                        this.month.current.classList.add("active");
                        break;

                    case 3:
                        this.year.current.classList.add("active");
                        break;

                    case 4:
                        this.years.current.classList.add("active");
                        break;

                    case 5:
                        this.ytd.current.classList.add("active");
                        break;

                    default:
                        this.ytd.current.classList.add("active");
                        break;
                }
            }.bind(this),
            200,
        );
    }

    rendering() {
        fetch(
            `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${API_KEY}`,
        )
            .then(res => res.json())
            .then(result => {
                stockData.changePercent = result.changePercent.toFixed(2);
                stockData.change = result.change.toFixed(2);

                closePrice = result.previousClose;

                stockData.name = result.companyName;
                stockData.previousClose = result.previousClose;
                stockData.latestTime = result.latestTime;
                stockData.extendedPrice = result.extendedPrice;
                if (result.extendedPrice === null) {
                    stockData.extendedPrice = "";
                    stockData.extendedChange = "";
                }
                stockData.extendedChange = result.extendedChange;
                if (this._isMounted) {
                    this.setState({
                        latestPrice: result.latestPrice.toFixed(2),
                    });
                }
                keyData[0] = this.abbrNum(result.marketCap, 2);
                keyDataLabel[0] = "Market Cap ";
                keyData[1] = result.peRatio;
                keyDataLabel[1] = "PE Ratio (TTM) ";

                keyData[2] = "$" + result.week52High;
                keyDataLabel[2] = "52 week High";

                keyData[3] = "$" + result.week52Low;
                keyDataLabel[3] = "52 Week Low ";

                keyData[4] = result.ytdChange.toFixed(2) + "%";
                keyDataLabel[4] = "YTD Change ";

                keyData[5] = result.latestVolume;
                if (keyData[5] !== null) {
                    keyData[5] = this.numberWithCommas(keyData[5]);
                } else {
                    keyData[5] = "---";
                }
                keyDataLabel[5] = "Volume ";
            })
            .then(
                function () {
                    if (stockData.change > 0 && this._isMounted) {
                        this.setState({
                            changeColor: "#3ae885",
                        });
                    } else if (stockData.change !== "0.00" && this._isMounted) {
                        this.setState({
                            changeColor: "#F45385",
                        });
                    } else if (this._isMounted) {
                        this.setState({
                            changeColor: "#999eaf",
                        });
                    }
                    if (stockData.extendedChange > 0 && this._isMounted) {
                        this.setState({
                            extendedColor: "#66F9DA",
                        });
                    } else if (stockData.extendedChange !== "0.00" && this._isMounted) {
                        this.setState({
                            extendedColor: "#F45385",
                        });
                    } else if (this._isMounted) {
                        this.setState({
                            extendedColor: "#999eaf",
                        });
                    }
                }.bind(this),
            );
        document.title = `SpaceTrade - ${symbol}`;
        fetch(
            `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${API_KEY}`,
        )
            .then(res => res.json())
            .then(result => {
                if (this._isMounted) {
                    this.setState({
                        latestPrice: result.latestPrice.toFixed(2),
                    });
                }
            })
            .then(() => {
                if (this.state.marketStatus) {
                    setInterval(() => {
                        fetch(
                            `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${API_KEY}`,
                        )
                            .then(res => res.json())
                            .then(result => {
                                if (this._isMounted) {
                                    this.setState({
                                        latestPrice: result.latestPrice.toFixed(2),
                                    });
                                }
                            });
                    }, 5000);
                }
            });
        setTimeout(() => {
            if (!this.state.marketStatus && this.buyInput.current) {
                this.buyInput.current.disabled = true;
                this.buyInput.current.placeholder = "MARKET CLOSED";
            } else if (this.buyInput.current) {
                this.buyInput.current.disabled = false;
                this.buyInput.current.placeholder = "QUANTITY";
            }
        }, 1000);

        this.getYTDChart();
        if (document.querySelector(".hamburger")) {
            document.querySelector(".hamburger").addEventListener("click", e => {
                e.currentTarget.classList.toggle("is-active");
            });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        fetch("https://financialmodelingprep.com/api/v3/is-the-market-open")
            .then(res => res.json())
            .then(result => {
                if (this._isMounted) {
                    this.setState({
                        marketStatus: result.isTheStockMarketOpen,
                    });
                }
            });
        fetch(
            `https://cloud.iexapis.com/stable/ref-data/symbols?token=${API_KEY}`,
        )
            .then(res => res.json())
            .then(result => {
                allSymbols = result.map(val => {
                    return val;
                });
                for (let i = 0; i < result.length; i++) {
                    symbolsOnly.push(result[parseInt(i)].symbol);
                }
            })
            .then(() => {
                symbol = window.location.href.split("/")[
                    window.location.href.split("/").length - 1
                ];
                setTimeout(() => {
                    if (this.isInArray(symbolsOnly, symbol)) {
                        if (this._isMounted) {
                            this.setState({ valid: true });
                        }
                        this.rendering();
                    } else if (this._isMounted) {
                        this.setState({ valid: true });
                        this.rendering();
                    }
                }, 1000);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <main className="stock" style={{marginLeft: "80px", marginTop: "75px"}}>
                {this.state.buyConfirmation === true && <div className="black-bg" />}
                {this.state.buyConfirmation === true && (
                    <div className="buyConfirmation">
                        <h3>
                            Are you sure you want to buy {this.buyInput.current.value} shares of {symbol} for{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {parseFloat(
                                    (
                                        this.buyInput.current.value * this.state.latestPrice
                                    ).toFixed(2),
                                )}
                            </span>{" "} dollars
                        </h3>
                        <div>
                            <button className="stockPage__buy-button" onClick={() => {
                                if (this.buyInput.current.value * this.state.latestPrice <= this.state.fundsWithoutCommas) {
                                    //this.handleBuyStock(this.buyInput.current.value);
                                } else if (this._isMounted) {
                                    this.setState({
                                        buyConfirmation: false,
                                    });
                                }
                            }}> CONFIRM
                            </button>
                            <button className="stockPage__buy-button cancel" onClick={() => {
                                if (this._isMounted) {
                                    this.setState({
                                        buyConfirmation: false,
                                    });
                                }
                            }}> CANCEL
                            </button>
                        </div>
                    </div>
                )}
                {this.state.valid === "" && <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}}/>}
                {this.state.valid && (
                        <div className="stockPage">
                            <div className="stockPage__top">
                                <FullChart
                                    changeFocus={this.changeFocus}
                                    getOneMonthChart={this.getOneMonthChart}
                                    getOneYearChart={this.getOneYearChart}
                                    getTwoYearChart={this.getTwoYearChart}
                                    getYTDChart={this.getYTDChart}
                                    getOneDayChart={this.getOneDayChart}
                                    data1={this.data1}
                                    year={this.year}
                                    years={this.years}
                                    stockData={stockData}
                                    ytd={this.ytd}
                                    month={this.month}
                                    day={this.day}
                                />
                                <div className="stockPage__trade">
                                    <div className="stockPage__mobile">
                                        <h4>{stockData.name}</h4>
                                        <div className="stockPage__trade-top">
                                            <h2>${this.state.latestPrice}</h2>
                                            <h6 style={{ color: this.state.changeColor }}>
                                                {stockData.change} ({stockData.changePercent}%)
                                                </h6>
                                        </div>
                                    </div>
                                    {!this.state.marketStatus &
                                        (stockData.extendedChange !== null) ? (
                                            <h6>
                                                Extended Hours:{" "}
                                                <span style={{ color: this.state.extendedColor }}>
                                                    ${stockData.extendedPrice} ({stockData.extendedChange}
                                                    )
                                                    </span>
                                            </h6>
                                        ) : (
                                            <div />
                                        )}
                                    <h5>Buy {symbol}</h5>
                                    <div className="stockPage__buy-container">
                                        <input
                                            className="stockPage__buy-input"
                                            id="buy-input"
                                            type="number"
                                        />
                                        <button onClick={function () {
                                            var result = localStorage.getItem('balance') - document.getElementById("buy-input").value;
                                            console.log("this.state.latestPrice  ");
                                            if (result >= 0) {
                                                //localStorage.setItem('balance', localStorage.getItem('balance') - (latestPrice * document.getElementById("buy-input").value)); // localStorage.getItem('balance') - latestPrice * cantidad del input 
                                                
                                                let transaction = {
                                                    "name": symbol,
                                                    "amount": document.getElementById("buy-input").value,
                                                    "price": 100
                                                };

                                                console.log(transaction);

                                                const stocks = JSON.parse(localStorage.getItem('stocks'));
                                                stocks.push(transaction);
                                                alert("You bought " + document.getElementById("buy-input").value + " shares!");
                                            } else {
                                                alert("You do not have enough money to buy this shares!");
                                            }
                                        }}
                                            className="stockPage__buy-button"> BUY
                                            </button>
                                    </div>
                                </div>
                            </div>
                            <div className="stockPage__keyStats">
                                <div className="info">
                                    <KeyInfo keyDataLabel={keyDataLabel} keyData={keyData} />
                                </div>
                                <div className="news">
                                    <News symbol={symbol} />
                                </div>
                            </div>
                        </div>
                )}
            </main>
        );
    }
}
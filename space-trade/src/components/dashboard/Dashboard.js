import React from "react";
import { Link } from "react-router-dom";
import { relDiff, numberWithCommas } from "../helpers.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import StockCard from "./StockCard.js";
import {keyList} from "../../data/apiKeys";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';

const apiKeys = [
    "OYMIDLPTGY6CAMP0",
    "TVARN7J9F191IFLB",
    "NOBPQ2OPX7E1XRT3",
    "7V0Q0N46CBIPHA2K",
];

let chartData1 = [],
    chartData2 = [],
    chartData3 = [];

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

const getValue = async (symbol, amount) => {
    var symbolValue = 90;
    const percChangeUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${keyList[1]}`;
    if (symbol) {
		const responseRetrived = await fetch(percChangeUrl);
		const responseObj = await responseRetrived.json();
		console.log("responseObj", responseObj.latestPrice)
        symbolValue = responseObj.latestPrice
    	return symbolValue ;
    }
}

const getGain = async (currentValue, oldValue, amount) => {
	console.log(`((${currentValue} * ${amount}) / (${oldValue}))`)
    let gain = ((currentValue * amount) / (oldValue));
    return gain;
}

class Dashboard extends React.Component {
    didLoad = false;
    constructor(props) {
        super(props);
        this.state = {
            loader1: "",
            loader2: "",
			loader3: "",
			activeStocks: "",
            portfolioDidLoad: "",
            fundsWithoutCommas: "",
            accountValue: "",
            marketStatus: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.portfolio = React.createRef();
        this.chartFirst = React.createRef();
        this.chartSecond = React.createRef();
        this.chartThird = React.createRef();

		////////////////////////////////////////////////////////////////////////////////////
        const labelGen = (length)=>{
            let result = "0";
            for (let i = 1; i < length; i++) {
                result = result + "," + i;
            }
            return result.split(",");
		}
		const setChartStyle = (canvas) => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 600, 10);
            gradient.addColorStop(0, "rgb(108, 148, 213)");
            gradient.addColorStop(1, "rgb(91, 207, 220)");
            let gradientFill = ctx.createLinearGradient(0, 0, 0, 100);
            gradientFill.addColorStop(0.1, "rgba(108, 148, 213, 0.2)");
			gradientFill.addColorStop(0.9, "rgb(91, 207, 220, 0)")
            ctx.shadowColor = "rgba(56, 162, 173, 0.7)";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			return {
				gradient: gradient,
				gradientFill: gradientFill
			}
		}
		const buildChartData = (chartData, gradient, gradientFill) => {
			return {
				labels: labelGen(chartData.length),
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
						data: chartData,
					},
				],
			};
		}
        this.data1 = canvas => {
			const {gradient, gradientFill} = setChartStyle(canvas);
			return buildChartData(chartData1, gradient, gradientFill)
        };
        this.data2 = canvas => {
			const {gradient, gradientFill} = setChartStyle(canvas);
            return buildChartData(chartData2, gradient, gradientFill)
        };
        this.data3 = canvas => {
			const {gradient, gradientFill} = setChartStyle(canvas);
            return buildChartData(chartData3, gradient, gradientFill)
        };
		////////////////////////////////////////////////////////////////////////////////////
    }
	// getAccountInfo() {
	// 	let user = firebase.auth().currentUser.uid;
	// 	let i = 0;
	
	// 	portfolioStocks = [];
	// 	portfolioValue = [];
	// 	portfolioShares = [];
	// 	portfolioMoneyPaid = [];
	// 	portfolioDifference = [];
	// 	portfolioColor = [];
	// 	firebase
	// 	  .firestore()
	// 	  .collection("users")
	// 	  .doc(user)
	// 	  .collection("stocks")
	// 	  .get()
	// 	  .then(snapshot => {
	// 		if (snapshot.docs.length !== 0 && portfolioDifference.length === 0) {
	// 		  snapshot.forEach(doc => {
	// 			if (portfolioStocks.length < 4) {
	// 			  portfolioStocks.push(doc.data().symbol);
	// 			  portfolioShares.push(doc.data().shares);
	// 			  portfolioMoneyPaid.push(parseFloat(doc.data().moneyPaid));
	// 			  this.getLatestPrice(portfolioStocks[parseInt(i)], i);
	// 			  i++;
	// 			}
	// 		  });
	// 		} else if (this._isMounted && portfolioStocks.length === 0) {
	// 		  this.setState({
	// 			portfolioDidLoad: "nothing",
	// 		  });
	// 		}
	// 	  })
	// 	  .then(() => {
	// 		if (this.portfolio.current && portfolioStocks.length > 0) {
	// 		  this.portfolio.current.style.display = "block";
	// 		}
	// 	  })
	// 	  .then(() => {
	// 		setTimeout(() => {
	// 		  let val = portfolioValue.reduce((a, b) => Number(a) + Number(b), 0);
	// 		  if (this._isMounted) {
	// 			this.setState({
	// 			  accountValue:
	// 				"$" +
	// 				numberWithCommas(
	// 				  Number(val) + Number(this.state.fundsWithoutCommas),
	// 				),
	// 			});
	// 		  }
	// 		}, 1300);
	// 	  })
	// 	  .then(() => {
	// 		if (portfolioStocks.length > 0) {
	// 		  setTimeout(() => {
	// 			if (this._isMounted) {
	// 			  this.setState({
	// 				portfolioDidLoad: true,
	// 			  });
	// 			}
	// 		  }, 1200);
	// 		}
	// 	  })
	// 	  .catch(error => {
	// 		if (this._isMounted) {
	// 		  this.setState({
	// 			portfolioDidLoad: false,
	// 		  });
	// 		}
	// 	  });
	//   }
    getChart(dataChart, symbol, callback) {
        let b = 0;
        const stockApi = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKeys[0]}`;
        fetch(stockApi)
            .then(res => res.json())
            .then(result => {
				console.log(result);
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
    getStockInfo = async (symbol, dataChart, changeStash, priceStash, num, callback) => {
		const percChangeUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${keyList[1]}`;
		
        if (symbol) {
			const percChangeResponse = await fetch(percChangeUrl);
			const percChangeObj = await percChangeResponse.json();
            if (percChangeObj.latestPrice !== null) {
				priceStash[parseInt(num)] = percChangeObj.latestPrice.toFixed(2);
			} else if (percChangeObj.iexRealtimePrice !== null) {
				priceStash[parseInt(num)] = percChangeObj.iexRealtimePrice.toFixed(2);
			}
			if (percChangeObj.changePercent !== null) {
				changeStash[parseInt(num)] = parseFloat(
					percChangeObj.changePercent,
				).toFixed(2);
			}
            this.getChart(dataChart, symbol, callback);
        }
    }
    getStocksList = async () => {
		const mostActivesUrl = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${keyList[1]}`;
		const gainersUrl = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${keyList[1]}`;
		const mostActiveResponse = await fetch(mostActivesUrl);
		const mostActiveObjArr = await mostActiveResponse.json();
		const gainersResponse = await fetch(gainersUrl);
		const gainersObjArr = await gainersResponse.json();
		let counter = 0;
		
		for (let i = 0; i < gainersObjArr.length; i++) {
			if (gainersObjArr[i].latestPrice !== null) {
				tempStocksSymbols.push(gainersObjArr[i].symbol);
				tempStockName.push(gainersObjArr[i].companyName);
				tempStockPrice.push(
					`$${gainersObjArr[i].latestPrice.toFixed(2)}`,
				);
			}
		}
		for (let i = 0; i < 9; i++) {
			if (mostActiveObjArr[i]) {
				if (
					this.isInArray(
						stockSymbols,
						mostActiveObjArr[i].symbol.toString(),
					)
				) {
					stockList[i] = tempStockName[counter];
					stockListPrices[i] =
						tempStockPrice[counter];
					stockListTickers[i] =
						tempStocksSymbols[counter];
					counter++;
				} else {
					stockList[i] = mostActiveObjArr[i].companyName;
					stockListPrices[i] = `$${mostActiveObjArr[i].latestPrice.toFixed(2)}`;
					stockListTickers[i] = mostActiveObjArr[i].symbol;
				}
			}
		}
		for (let i = 0; i < 9; i++) {
			const percChangeUrl = `https://cloud.iexapis.com/stable/stock/${stockListTickers[i]}/quote?displayPercent=true&token=${keyList[1]}`;

			if (stockListTickers[i]) {
				const percChangeResponse = await fetch(percChangeUrl);
				const percChangeObj = await percChangeResponse.json();
				console.log(percChangeObj.changePercent)

				if (percChangeObj.changePercent !== null) {
					stockListChange[i] = parseFloat(percChangeObj.changePercent).toFixed(2);
				} else {
					stockListChange[i] = "---";
				}
				if (Math.sign(stockListChange[i]) === -1) {
					stockListChangeColors[i] = "rgb(255, 77, 77";
				} else if (
					Math.sign(stockListChange[i]) === 1
				) {
					stockListChangeColors[i] = "rgb(51, 255, 133";
					stockListChange[i] =
						"+" + stockListChange[i];
					if (
						stockListChange[i].charAt(0) === "+" &&
						stockListChange[i].charAt(1) === "+"
					) {
						stockListChange[i] = stockListChange[i].substr(1);
					}
				} else {
					stockListChangeColors[i] = "rgb(153,158,175";
				}
				if (stockListChange[i] !== "---") {
					stockListChange[i] = stockListChange[i] + "%";
				}
			}
		}
		if (this.didLoad) {
			this.setState({
				activeStocks: true,
			});
		}
    }

    getLatestPrice(symbol, i) {
        const lastPrice = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${keyList[1]}`;
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

    getGainers = async ()=>{
        chartData1 = [];
        chartData2 = [];
        chartData3 = [];

		const gainers = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${keyList[1]}`;
		const responseRetrived = await fetch(gainers);
		const responseObj = await responseRetrived.json();
		for (let i = 0; i < 3; i++) {
			if (responseObj[i]) {
				console.log("responseObj[i]", responseObj[i])
				stockSymbols.push(responseObj[i].symbol);
			}
		}
		// PARA MOSTRAR INFO EN CHART 1
		this.getStockInfo(
			stockSymbols[0],
			chartData1,
			stockChanges,
			stockPrices,
			0,
			() => {
				let firstChart = this.chartFirst.current;
				if (firstChart) {
					if (
						typeof stockChanges[0] !== "undefined" &&
						typeof stockPrices[0] !== "undefined" &&
						chartData1.length >= 2 &&
						firstChart &&
						this.didLoad
					) {
						this.setState({
							loader1: true,
						});
						firstChart.href = "/stocks/" + stockSymbols[0];
					} else if (this.didLoad) {
						this.setState({
							loader1: false,
						});
						if (firstChart) {
							firstChart.href = "#";
						}
					}
				}
			}
		);
		// PARA MOSTRAR INFO EN CHART 2
		this.getStockInfo(
			stockSymbols[1],
			chartData2,
			stockChanges,
			stockPrices,
			1,
			() => {
				let secondChart = this.chartSecond.current;
				if (secondChart) {
					if (
						typeof stockChanges[1] !== "undefined" &&
						typeof stockPrices[1] !== "undefined" &&
						chartData2.length >= 2 &&
						secondChart &&
						this.didLoad
					) {
						this.setState({
							loader2: true,
						});
						secondChart.href = "/stocks/" + stockSymbols[1];
					} else if (this.didLoad) {
						this.setState({
							loader2: false,
						});
						secondChart.href = "#";
					}
				}
			},
		);
		// PARA MOSTRAR INFO EN CHART 3
		this.getStockInfo(
			stockSymbols[2],
			chartData3,
			stockChanges,
			stockPrices,
			2,
			() => {
				let thirdChart = this.chartThird.current;
				if (thirdChart) {
					if (
						typeof stockChanges[2] !== "undefined" &&
						typeof stockPrices[2] !== "undefined" &&
						chartData3.length >= 2 &&
						thirdChart &&
						this.didLoad
					) {
						this.setState({
							loader3: true,
						});
						thirdChart.href = "/stocks/" + stockSymbols[2];
					} else if (this.didLoad) {
						this.setState({
							loader3: false,
						});
						thirdChart.href = "#";
					}
				}
			},
		);
	}
	getMarketStatus = async () => {
		const marketOpenUrl = "https://financialmodelingprep.com/api/v3/is-the-market-open";
		const marketOpenResponse = await fetch(marketOpenUrl);
		const marketOpenObj = await marketOpenResponse.json();
		return marketOpenObj.isTheStockMarketOpen
	}

	getPorfolioStoks = async () => {
		portfolioStocks = JSON.parse(localStorage.getItem('stocks'));
		if(portfolioStocks.length){
			this.setState({
				portfolioLoader: true
			})
		}
		else {
			this.setState({
				portfolioLoader: "empty"
			})
		}

	}

    componentDidMount() {

		this.didLoad = true;
		this.setState({
			marketStatus: this.getMarketStatus()
		});
        this.getGainers();
		this.getStocksList();
		this.getPorfolioStoks();
		
    }

    componentWillUnmount() {
        this.didLoad = false;
    }

    render() {
        for (let i = 0; i < stockSymbols.length; i++) {
            if (Math.sign(stockChanges[parseInt(i)]) === -1) {
                changesColors[parseInt(i)] = "#ff4d4d";
            } else if (Math.sign(stockChanges[parseInt(i)]) === 1) {
                changesColors[parseInt(i)] = "#33ff85";
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
        const balance = localStorage.getItem('balance');
        return (
            <main className="Dashboard" id="dashboard" style={{width: "calc(100% - 57px)", right: "0"}}>
                {localStorage.getItem('balance')}
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <div style={{ display: "flex", height: "auto" }}>
                        <div className="panel">
                            <div className="panel__top">
                                <div className="panel__title">
                                    <div style={{ display: "flex", alignItems: "center" }}>
										<AssessmentRoundedIcon style={{fill: "rgba(236, 237,237, 0.9)", marginTop: "36px", marginBottom: "24px", marginRight: "10px"}}/>
                                        <h3 style={{color: "rgba(236, 237,237, 0.9)"}}>Gainers</h3>
                                    </div>
                                </div>
                                <div className="panel__topCharts" style={{ display: "flex" }}>
                                    <a
                                        ref={this.chartFirst}
                                        id="chartFirst"
                                        href="/"
                                        className="chartLink">
                                        <StockCard
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
                                        <StockCard
                                            loader={this.state.loader1}
                                            data={this.data2}
                                            stockSymbol={stockSymbols[1]}
                                            stockPrice={stockPrices[1]}
                                            stockChange={stockChanges[1]}
                                            changesColor={changesColors[1]}
                                        />
                                    </a>
                                    <a
                                        ref={this.chartThird}
                                        id="chartThird"
                                        href="/"
                                        className="chartLink">
                                        <StockCard
                                            loader={this.state.loader1}
                                            data={this.data3}
                                            stockSymbol={stockSymbols[2]}
                                            stockPrice={stockPrices[2]}
                                            stockChange={stockChanges[2]}
                                            changesColor={changesColors[2]}
                                        />
                                    </a>
                                    
                                </div>
                            </div>
							<div className="panel__portfolio-section">
								<div
									style={{
									display: "flex",
									alignItems: "center",
								}}>
									<BusinessCenterRoundedIcon style={{fill: "rgba(236, 237,237, 0.9)", marginTop: "36px", marginBottom: "24px", marginRight: "10px"}}/>
									<h3 style={{color: "rgba(236, 237,237, 0.9)"}}>Portfolio</h3>
								</div>
								<div
									className="panel__portfolio"
									ref={this.portfolio}
									id="portfolio"
								>
									{this.state.portfolioDidLoad === "" && (<CircularProgress style={{position: "absolute", left: "50%", top: "50%"}}/>)}
									{this.state.portfolioDidLoad === "empty" && (<span>You have not bought anything!</span>)}
									{this.state.portfolioDidLoad === false && (
										<div className="errorMsg" style={{color: "rgba(255, 255, 255, 0.5)"}}>
											<ErrorOutlineIcon style={{ fontSize: 80}}/>
											<p>Couldn't load :(</p>
										</div>)
									}                                                    
									{ this.state.portfolioDidLoad === true &&
										(
											<table className="panel__portfolio-list" style={{borderSpacing: "15px"}}>
												<thead>
													<tr>
														<th style={{textAlign: "left", paddingLeft: "10px"}}>SYMBOL</th>
														<th style={{textAlign: "right"}}>QUANTITY</th>
														<th style={{textAlign: "right", paddingRight: "15px"}}>GAIN/LOSS (%)</th>
														<th style={{textAlign: "left"}}>BOUGHT PRICE</th>
														<th style={{textAlign: "left"}}>CURRENT PRICE</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{
														portfolioStocks.map((value, index) => {
															// let currentValue = getValue(value.name, value.amount);
															return (
																	<tr key={index}>
																	<td style={{textAlign: "left"}}>{value.name}</td>
																	<td style={{textAlign: "right"}}>{value.amount}</td>
																	<td style={{textAlign: "left"}}>${getValue(value.name, value.amount)}</td>
																	<td><button style={{backgroundColor: "#35b660b5", margin: "5px", padding: "5px 15px", borderRadius: "15px", color: "rgba(255, 255, 255, 0.7)"}}>Sell</button></td>
																</tr>
															);
														})
													}
												</tbody>
											</table>
										)
									}
								</div>
							</div>
                            <div className="panel__low">
                            <div className="panel__bottom-title">
								<OfflineBoltIcon style={{fill: "rgba(236, 237,237, 0.9)", marginTop: "36px", marginBottom: "24px"}}/>
                                <h3 style={{color: "rgba(236, 237,237, 0.9)"}}>Most Active</h3>
                            </div>
                            {this.state.activeStocks === true && (
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
                            {this.state.activeStocks === "" && <CircularProgress style={{position: "absolute", left: "50%", top: "50%"}}/>}
                            {this.state.activeStocks === false && (
									<div className="errorMsg" style={{color: "rgba(255, 255, 255, 0.5)"}}>
										<ErrorOutlineIcon style={{ fontSize: 80}}/>
										<p>Couldn't load :(</p>
									</div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Dashboard;

import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {keyList} from "../../data/apiKeys"

const API_KEY = keyList[4];
let portfolioStocks = [];
export default class portfolio extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			portfolioDidLoad: ""
		};
		// this.handleStockSell = this.handleStockSell.bind(this);
	}

	/*
	* gets latest price from API and changes color depending on that
	* @param {symbol} name of stock as symbol
	* @param {i} index of array
	*/

	// getLatestPrice = async (symbol, i) => {
	// 	const lastPriceUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${API_KEY}`;
	// 	const response = await fetch(lastPriceUrl);
	// 	const responseObj = await response.json();
		
	// 	value[i] = parseFloat(
	// 		Number(shares[i] * responseObj.latestPrice).toFixed(2),
	// 	);
	// 	difference[i] =
	// 	// relDiff(parseFloat(value[i]),parseFloat(moneyPaid[i]),).toFixed(2) + "%";
	// 	change[i] =	"$" + parseFloat(parseFloat(value[i] - parseFloat(moneyPaid[i]),).toFixed(2),);
	// 	if (value[i] > moneyPaid[i]) {
	// 		difference[i] = `+${difference[i]}`;
	// 		color[i] = "#66F9DA";
	// 	}
	// 	else if (value[i] === moneyPaid[i]) {
	// 		color[i] = "#999EAF";
	// 	}
	// 	else {
	// 		difference[i] = `-${difference[i]}`;
	// 		color[i] = "#F45385";
	// 	}
	// 	if (difference[i].includes("NaN")) {
	// 		difference[i] = "---";
	// 		color[i] = "#999EAF";
	// 	}
	// 	if (change[i].split("")[1] === "-") {
	// 		let name = "" + change[i];
	// 		change[i] = `-$${name.substr(2)}`;
	// 	}
	// }

	/*
	* gets users opened positions
	*/

	// getPositions() {
	// 	if (this._isMounted)
	// 	this.setState({
	// 		loader1: "",
	// 	});
	// 	symbols = [];
	// 	position = [];
	// 	shares = [];
	// 	moneyPaid = [];
	// 	let user = firebase.auth().currentUser.uid;
	// 	let i = 0;
	// 	firebase
	// 	.firestore()
	// 	.collection("users")
	// 	.doc(user)
	// 	.collection("stocks")
	// 	.get()
	// 	.then(snapshot => {
	// 		if (snapshot.docs.length !== 0) {
	// 		snapshot.forEach(doc => {
	// 			position.push(doc.id);
	// 			symbols.push(doc.data().symbol);
	// 			shares.push(doc.data().shares);
	// 			moneyPaid.push(doc.data().moneyPaid);
	// 			this.getLatestPrice(symbols[i], i);
	// 			i++;
	// 		});
	// 		} else {
	// 		if (this._isMounted)
	// 			this.setState({
	// 			loader1: "nothing",
	// 			});
	// 		}
	// 	})
	// 	.then(() => {
	// 		setTimeout(() => {
	// 		if (
	// 			this._isMounted &&
	// 			symbols.length > 0 &&
	// 			difference.length === symbols.length
	// 		) {
	// 			this.setState({
	// 			loader1: true,
	// 			});
	// 		}
	// 		}, 1000);
	// 	});
	// }

	/*
	* closes position
	* @param {position} name of position
	* @param {number} index of 'value' array
	*/

	// handleStockSell(position, number) {
	// 	symbols = [];
	// 	let user = firebase.auth().currentUser.uid;
	// 	if (this.state.marketStatus && this._isMounted) {
	// 	this.setState({
	// 		confirmation: true,
	// 	});
	// 	firebase
	// 		.firestore()
	// 		.collection("users")
	// 		.doc(user)
	// 		.collection("stocks")
	// 		.doc(position)
	// 		.delete()
	// 		.then(
	// 		function() {
	// 			if (this._isMounted)
	// 			this.setState({
	// 				funds:
	// 				Number(this.state.funds) + Number(value[parseInt(number)]),
	// 			});
	// 			firebase
	// 			.firestore()
	// 			.collection("users")
	// 			.doc(user)
	// 			.update({
	// 				currentfunds: this.state.funds,
	// 			})
	// 			.catch(() => {
	// 				if (this._isMounted) {
	// 				this.setState({
	// 					loader1: false,
	// 				});
	// 				}
	// 			});
	// 			this.getPositions();
	// 		}.bind(this),
	// 		)
	// 		.catch(function(error) {
	// 		console.error(error);
	// 		});
	// 	}
	// }
	getPorfolioStoks = async () => {
		portfolioStocks = JSON.parse(localStorage.getItem('stocks'));
        portfolioStocks.forEach(element => {
            element["gain"] = 12 //getGain(value.name, value.price, value.amount);
            element["value"] = 13 //getValue(value.name, value.amount);
        });

        if (portfolioStocks.length) {
            this.setState({
                portfolioDidLoad: true
            })
        }
        else {
            this.setState({
                portfolioDidLoad: "empty"
            })
        }

    }
	componentDidMount() {
		this._isMounted = true;

		/*
		* check if market opened
		*/

		fetch("https://financialmodelingprep.com/api/v3/is-the-market-open")
		.then(res => res.json())
		.then(result => {
			if (this._isMounted) {
			this.setState({
				marketStatus: result.isTheStockMarketOpen,
			});
			}
		});
		console.log("cargó")
        this.getPorfolioStoks();
		document.title = `SpaceTrade - Portfolio`;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	render() {
		function updateShares() {
            var stocks = [];
            portfolioStocks.forEach(element => {
                if (element.amount > 0) {
                    stocks.push(
                        {
                            "name": element.name,
                            "amount": element.amount,
                            "price": element.price
                        }
                    )
                };
            });
            console.log(stocks);
            localStorage.setItem('stocks', JSON.stringify(stocks));
        }
		return (
			<main className="portfolio">
				<div className="portfolioContainer">
					{this.state.portfolioDidLoad === "" && <CircularProgress style={{position: "fixed", top: "50%", left: "50%"}}/>}
					{this.state.portfolioDidLoad === true && (
						<table className="panel__portfolio-list" style={{ borderSpacing: "15px" }}>
							<thead>
								<tr>
									<th style={{ textAlign: "center" }}>SYMBOL</th>
									<th style={{ textAlign: "center" }}>QUANTITY</th>
									<th style={{ textAlign: "center" }}>GAIN/LOSS (%)</th>
									<th style={{ textAlign: "center" }}>BOUGHT PRICE</th>
									<th style={{ textAlign: "center" }}>CURRENT PRICE</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{
									portfolioStocks.map((value, index) => {
										return (
											<tr key={index}>
												<td style={{ textAlign: "center" }}>{value.name}</td>
												<td style={{ textAlign: "center" }}>{value.amount}</td>
												<td style={{ textAlign: "center" }}>{value.gain}%</td>
												<td style={{ textAlign: "center" }}>${value.price}</td>
												<td style={{ textAlign: "center" }}>${value.value}</td>
												<td><button onClick={() => {
													var shares = portfolioStocks[index].amount;
													if (shares > 0) {
														portfolioStocks[index].amount -= 1;
														localStorage.setItem('balance', parseInt(localStorage.getItem('balance')) + portfolioStocks[index].price);
														updateShares();
														alert("You sold 1 " + portfolioStocks.name + " share!");
														this.forceUpdate();
													} else {
														alert("You already sold this share!");
													}
												}} style={{ backgroundColor: "#35b660b5", margin: "5px", padding: "5px 15px", borderRadius: "15px", color: "rgba(255, 255, 255, 0.7)" }}>Sell x1</button></td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
					)}
				</div>
			</main>
		);
	}
}
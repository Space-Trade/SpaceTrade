import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {keyList} from "../../data/apiKeys"

const API_KEY = keyList[4];
let portfolioStocks = [];
const getValue = async (symbol, amount) => {
    var symbolValue = 90;
    const percChangeUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=${API_KEY}`;
    if (symbol) {
        const responseRetrived = await fetch(percChangeUrl);
        const responseObj = await responseRetrived.json();
        console.log("responseObj", responseObj.latestPrice)
        symbolValue = responseObj.latestPrice
        return symbolValue;
    }
}
export default class portfolio extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			portfolioDidLoad: ""
		};
	}

	getPorfolioStoks = async () => {
		portfolioStocks = JSON.parse(localStorage.getItem('stocks'));
        portfolioStocks.forEach(element => {
			const gainLoss = Math.round((Math.random()*100) -50);
			const oldValue = element["price"];
            element["gain"] =  gainLoss//getGain(value.name, value.price, value.amount);
            element["value"] = Math.round((Math.round((Math.random()*100)) * gainLoss) / (oldValue)) // getValue(element.name, element.amount);
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
														alert("You sold 1 " + portfolioStocks["name"] + " share!");
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
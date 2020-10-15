import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import controlPanel from "../../assets/images/controlPanel.png";
import menuPanel from "../../assets/images/menu.png";
import dashboard from "../../assets/images/dashboard.png";
import stock from "../../assets/images/stock.png";
import portfolio from "../../assets/images/portfolio.png";

const HelpCard = styled.div`
	width: 49%;
	height: auto;
	min-height: 400px;
	padding: 20px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
	border-radius: 10px;
	background-color: rgba(50, 79, 123, 0.25);
	margin-bottom: 20px;
	@media only screen and (max-width:900px){
		width: 100%
	}
`;
const HelpCardTitle = styled.h3`
	width: 100%;
	padding-left: 20px;
	font-size: 1.3em;
	margin: 0;
	margin-bottom: 30px;
	border-left: 2px solid rgba(250, 250, 250, 0.4);
	font-weight: 100;

`;
const useStyles = makeStyles((theme) => ({
	mainContainer: {
		width: "calc( 100% - 55px)",
		height: "calc(100% - 73px)",
		padding: "20px",
		position: "absolute",
		bottom: "0",
		right: "0",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		alignContent: "flex-start",
		justifyContent: "space-evenly",
		["@media only screen and (max-width:900px)"]: {
			width: "100%"
		}
	},
	cardImg: {
		width: "49%",
		height: "auto",
		borderRadius: "40px",
		boxShadow: "-5px 5px 20px rgba(255, 255, 255, 0.2)",
		["@media only screen and (max-width:500px)"]: {
			width: "100%"
		}

	},
	explanation: {
		width: "49%",
		height: "100%",
		marginLeft: "10px",
		fontSize: "0.9em",
		fontWeight: "100",
		["@media only screen and (max-width:500px)"]: {
			width: "100%",
			marginTop: "10px",
			marginLeft: "0px",
		}
	}
}));

export default function VerticalMenu() {
	const classes = useStyles();

	React.useEffect(() => {
		document.title = `SpaceTrade - Help!`;
	}, [])
	return (
		<main className={classes.mainContainer}>
			<HelpCard>
				<HelpCardTitle>Control Panel</HelpCardTitle>
				<img src={controlPanel} className={classes.cardImg} />
				<p className={classes.explanation}>
					In the panel control, you will find the main control options about your account.<br />
					The message received, notifications, account options, and the balance that you have.
				</p>
			</HelpCard>
			<HelpCard>
				<HelpCardTitle>Menu Panel</HelpCardTitle>
				<img src={menuPanel} className={classes.cardImg} />
				<p className={classes.explanation}>
					You can expand the menu to access to the Dashboard, your Portfolio, and your total income<br />
					At the bottom of the vertical menu, you can log out, and access to the <span style={{ color: "rgb(39,210,218,1)" }}>Help</span> page.
				</p>
			</HelpCard>
			<HelpCard>
				<HelpCardTitle>Dashboard</HelpCardTitle>
				<img src={dashboard} className={classes.cardImg} />
				<p className={classes.explanation}>
					In the <span style={{ color: "rgb(39,210,218,1)" }}>Dashboard</span> you can see the charts of the current top 3 winners at the moment.<br />
					Below the charts, you can see a brief table of your portfolio showing your last 5 stocks purchased.
				</p>
			</HelpCard>
			<HelpCard>
				<HelpCardTitle>Portfolio</HelpCardTitle>
				<img src={portfolio} className={classes.cardImg} />
				<p className={classes.explanation}>
					The <span style={{ color: "rgb(39,210,218,1)" }}>Portfolio</span> page you can see your stocks purchased. <br />
					On this page, you will be able to sell your stocks, choosing the number of stocks to be sold.
				</p>
			</HelpCard>
			<HelpCard>
				<HelpCardTitle>Stock Page</HelpCardTitle>
				<img src={stock} className={classes.cardImg} />
				<p className={classes.explanation}>
					The <span style={{ color: "rgb(39,210,218,1)" }}>Stock</span> page you can see the whole information of the stock. Here you will be able to see the chart of the stock, can buy a number of stocks.<br />
					Get the main information with the <span style={{ color: "rgb(39,210,218,1)" }}>Key Information</span> section. Or you can take a risk and bet according to the news that you can see in the <span style={{ color: "rgb(39,210,218,1)" }}>news section</span>
				</p>
			</HelpCard>
		</main>
	);
}
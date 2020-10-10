import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Loader from "../elements/Loader";

const useStyles = makeStyles((theme) => ({
	stockChart: {
		backgroundColor: "rgba(50, 79, 123, 0.25)",
		boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.2)",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "column",
		position: "relative",
		borderRadius: "20px",
		textAlign: "center",
		marginBottom: "20px",
		minWidth: "250px",
		height: "100%",
		cursor: "pointer"
	}

}));
  
Chart.propTypes = {
	loader: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	stockSymbol: PropTypes.string,
	stockPrice: PropTypes.string,
	stockChange: PropTypes.string,
	changesColor: PropTypes.string,
	options: PropTypes.object,
	data: PropTypes.func,
  };

var options = {
  maintainAspectRatio: false,
  responsive: true,
  tooltips: {enabled: false},
  hover: {mode: null},
  layout: {
    padding: {
      bottom: 15,
    },
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
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
      tension: 1,
    },
  },
};

export default function Chart({
  loader,
  stockSymbol,
  stockChange,
  data,
  stockPrice,
  changesColor,
}){
	const classes = useStyles();
	return(
		<div className={classes.stockChart}>
			{loader === "" && <Loader />}
			{loader === false && (
			<div className="errorMsg">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
				</g>
				</svg>
				<p>Couldn't load chart try again in few minutes</p>
			</div>
			)}
			{loader === true && (
			<div className="stockChart__chart">
				<Line data={data} options={options} />
			</div>
			)}
			{loader ? (
			<div className="stockChart__info">
				<h3 className="stockChart__name">{stockSymbol}</h3>
				<div className="stockChart__price-info">
				<h4 className="stockChart__change" style={{color: changesColor}}>
					{stockChange}%
				</h4>
				<h3 className="stockChart__price">${stockPrice}</h3>
				</div>
			</div>
			) : (
			<div />
			)}
		</div>
	);
}

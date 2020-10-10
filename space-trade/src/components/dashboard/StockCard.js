import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
  
StockCard.propTypes = {
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
      bottom: 0,
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

export default function StockCard({
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
			{loader === "" && <CircularProgress/>}
			{loader === false && (
			<div className="errorMsg" style={{color: "rgba(255, 255, 255, 0.5)"}}>
				<ErrorOutlineIcon style={{ fontSize: 80}}/>
				<p>Couldn't load :(</p>
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
				<h4 className="stockChart__change" style={{color: changesColor, textShadow: `0px 0px 5px ${changesColor}80`}}>
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

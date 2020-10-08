import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  footerInfo: {
	color: 'rgba(240, 240, 240, 0.8)',
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "center",
	height: "100%"
  }
}));

class Clock extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString()
		};
	}
	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	tick() {
		this.setState({
			time: new Date().toLocaleString()
		});
	}
	render() {
		return (
			<p style={{fontSize: "25px", margin: 0,  marginLeft: "5px"}}>
				{this.state.time}
			</p>
		);
	}
  }
  class TimeZone extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			timeZone: "GTM-3"
		};
	}
	componentDidMount() {
		this.intervalID = setInterval(
			() => this.updateTimeZone(),
			600000
		);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	render() {
		return (
			<p style={{fontSize: "25px", margin: 0, marginRight: "10px"}}>
				{this.state.timeZone}
			</p>
		);
	}
  }

const FooterStyle = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(63, 81, 181, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

function Footer() {
  const classes = useStyles()
  return (
    <FooterStyle >
      <Typography variant="body2" color="textSecondary" className={classes.footerInfo}>
        
        <Clock />
        
        <p style={{margin: 0}}>Copyright © SpaceDream</p>
		<TimeZone />
      </Typography>
    </FooterStyle>
  );
}
export default Footer;

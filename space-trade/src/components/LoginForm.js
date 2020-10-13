import * as React from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import logo from "../assets/logoWhite.png";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import {
  Link
} from "react-router-dom";
import {
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		marginBottom: "25px"
	},
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	logo: {
		width: "50%",

	},
	form: {
		width: "100%",
		"& h2": {
			fontSize: "30px",
			marginBottom: "20px"
		}
	},
	button: {
		width: "100%",
		backgroundColor: "rgba(236, 237,237, 0.9)",
		boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
		color: "#2a3749",
		transition: "0.2 ease",
		"&:hover": {
			backgroundColor: "rgba(236, 237,237, 1)",
			boxShadow: "0px 0px 10px rgba(236, 237,237, 0.3)",
		}
	},
	link: {
		fontSize: "15px",
		marginTop: "5px",
		"&:hover": {
			textDecoration: "underline"
		}

	}
}));

const CssTextField = withStyles({
	root: {
		'& label': {
		color: 'rgba(236, 237,237, 0.7)',
		},
		'& label.Mui-focused': {
		color: 'rgba(236, 237,237, 1)',
		textShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)"
		},
		'& .MuiInput-underline:after': {
		borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			color: "rgba(236, 237,237, 0.9)",
		'& fieldset': {
			backgroundColor: "rgba(236, 237,237, 0.2)",
			borderColor: 'rgba(236, 237,237, 1)',
		},
		'&:hover fieldset': {
			borderColor: 'rgba(236, 237,237, 1)',
			backgroundColor: "rgba(236, 237,237, 0.07)",
		},
		'&.Mui-focused fieldset': {
			borderColor: 'rgba(236, 237,237, 1)',
		},
		},
	},
})(TextField);

const LoginForm = () => {
  const classes = useStyles();
  var show = true;

  if ({ show }) {
    return (
      <Container maxWidth="sm" className={classes.container}>
        <div style={{ textAlign: "center" }}>
       		<Logo src={logo} className={classes.logo}/>
        </div>
        <main className={classes.form}>
			<Typography variant="h2">
				Login
			</Typography>
			<FormContainer>
				<CssTextField
					className={classes.margin}
					variant="outlined"
					id="email"
					label="Email"
				/>
				<CssTextField
					className={classes.margin}
					variant="outlined"
					id="password"
					label="Password"
					type="password"
				/>
				<Link to="/dashboard">
					<Button	variant="contained" type="submit" className={classes.button}>LOGIN</Button>
				</Link>
				<Grid container style={{justifyContent: "space-between"}}>
					<Link to="/register">
						<Grid item xs className={classes.link}>
							Forgot password?
						</Grid>
					</Link>
					<Link to={{
						pathname: "/register",
						state: { hola: true }
						}} >
						<Grid item className={classes.link}>
						
						Don't have an account? Sign Up
						</Grid>
					</Link>
				</Grid>
			</FormContainer>
		</main>
        <br />
      </Container>
    );
  }
  return (<></>);
};

const Logo = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withRouter(LoginForm);

import * as React from "react";
import styled from "styled-components";
import logo from "../assets/logoWhite.png";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';

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

const RegisterForm = () => {
  const classes = useStyles();

	return (
		<Container maxWidth="sm" className={classes.container}>
			<div style={{ textAlign: "center" }}>
				<Logo src={logo} className={classes.logo}/>
			</div>
			<main className={classes.form}>
				<Typography variant="h2">
				Register
				</Typography>
				<FormContainer>
					<CssTextField
						className={classes.margin}
						variant="outlined"
						id="fullname"
						label="Fullname"
					/>
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
					<CssTextField
						className={classes.margin}
						variant="outlined"
						id="repeatPassword"
						label="Repeat password"
						type="password"
					/>
					<Link to="/dashboard">
						<Button	variant="contained" type="submit" className={classes.button}>REGISTER</Button>
					</Link>
					<Grid container style={{justifyContent: "space-between"}}>
							<Grid>
							</Grid>
						<Link to={"/login"} >
							<Grid item className={classes.link}>
								Already have an account? Sign In
							</Grid>
						</Link>
					</Grid>
				</FormContainer>
			</main>
			<br />
		</Container>
    // <Container maxWidth="sm">
    //   <div style={{ textAlign: "center" }}>
    //     <br />
    //     <Logo src={logo} />
    //     <br />
    //     <br />
    //     <Typography variant="h4">
    //       Register
    //   </Typography>
    //   </div>
    //   <br />
    //   <FormContainer>
    //     <CssTextField
    //       className={classes.margin}
    //       variant="outlined"
    //       id="fullname"
    //       label="Fullname"
    //     />
    //     <br />
    //     <CssTextField
    //       className={classes.margin}
    //       variant="outlined"
    //       id="email"
    //       label="Email"
    //     />
    //     <br />
    //     <CssTextField
    //       className={classes.margin}
    //       variant="outlined"
    //       id="password"
    //       label="Password"
    //       type="password"
    //     />
    //     <br />
    //     <CssTextField
    //       className={classes.margin}
    //       variant="outlined"
    //       id="repeatPassword"
    //       label="Repeat password"
    //       type="password"
    //     />
    //     <br />
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       type="submit"
    //     ><Link to="/dashboard">
    //         REGISTER
    //               </Link>
    //     </Button>
    //     <Grid container>
    //       <Grid item xs>
    //       </Grid>
    //       <Grid item>
    //         <Link to="/login">
    //           {"Already have an account? Sign In"}
    //         </Link>
    //       </Grid>
    //     </Grid>
    //   </FormContainer>
    //   <br />
    // </Container>
  );
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

export default RegisterForm;

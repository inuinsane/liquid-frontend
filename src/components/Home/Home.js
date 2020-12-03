import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link, Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Liquid Enjiniring
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Home = () => {
  const classes = useStyles();
  const [auth, setAuth] = useContext(AuthContext);
  const token = localStorage.getItem("token");

  // Get User
  const getUser = async () => {
    try {
      const res = await Axios({ url: auth.profileUrl, method: 'GET', headers: { Authorization: `Bearer ${token}` } });
      // console.log(res.data);
      setAuth({
        ...auth,
        hasAccount: true,
        isLoggedIn: true,
        currentUser: {
          ...auth.currentUser,
          id: res.data.id,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
        },
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (token) {
      getUser();
    }
    else {
      console.log("Belum login");
    }
  })

  if (!auth.currentUser.id) {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {auth.hasAccount ? <Login /> : <Register />}
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>

    )
  } else {
    return (
      <Redirect to="/dashboard/details" />
    );
  }
};

export default Home;

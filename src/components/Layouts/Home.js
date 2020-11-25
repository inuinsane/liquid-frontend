import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Register from "../Register";
import Login from "../Login";
import { Typography, Link, Box } from "@material-ui/core";
import { AuthContext } from "../Context/AuthContext";
import { Redirect } from "react-router-dom";
import Axios from "axios";

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
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios({
        url: auth.profileUrl,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log(res);
          setStatus(true);
          setAuth({
            ...auth,
            hasAccount: true,
            isLoggedIn: true,
            currentUser: {
              ...auth.currentUser,
              id: res.data.user.id,
              name: res.data.user.name,
              username: res.data.user.username,
              email: res.data.user.email,
            },
          });
        })
        .catch((err) => {
          console.log("Session ended");
        });
    } else {
      console.log("no token");
    }
  });

  return status === false ? (
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
  ) : (
    <Redirect to="/dashboard" />
  );

  // status ? (
  //   <Redirect to="/dashboard" />
  // ) : (
  //   <Grid container component="main" className={classes.root}>
  //     <CssBaseline />
  //     <Grid item xs={false} sm={4} md={7} className={classes.image} />
  //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  //       {auth.hasAccount ? <Login /> : <Register />}
  //       <Box mt={5}>
  //         <Copyright />
  //       </Box>
  //     </Grid>
  //   </Grid>
  // );
};

export default Home;

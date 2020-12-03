import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Axios from "axios";

// Styling
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "Liquid Enjiniring | Login" });

  const [login, setLogin] = useState({
    username: null,
    password: null,
    remember: false,
  });

  const changeHasAccount = () => {
    setAuth({ ...auth, hasAccount: !auth.hasAccount });
  };
  // Login handle
  const handleLogin = async (e) => {
    if (login.username && login.password) {
      e.preventDefault();
      const data = {
        username: login.username,
        password: login.password,
      };

      // Fetch data to server
      Axios.post(auth.loginUrl, data).then((res) => {
        const error = res.data.error;
        if (error) {
          // console.log(error);
          setError(error);
          setShow(true);
        } else {
          // console.log(res.data);
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
              token: res.data.token,
            },
          });
          setError('');
          localStorage.setItem("token", res.data.token);
          console.log("Login Success");
          setLogin({
            ...login,
            username: null,
            password: null,
            remember: null,
          });
        }
      });
    } else {
      e.preventDefault();
      setError("Username dan password harus diisi!");
      setShow(true);
    }
  };

  const handleChange = (e) => {
    switch (e.target.type) {
      case "text":
        setLogin({ ...login, username: e.target.value });
        break;
      case "password":
        setLogin({ ...login, password: e.target.value });
        break;
      case "checkbox":
        setLogin({ ...login, remember: !login.remember });
        break;
      default:
    }
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Dialog
          open={show}
          onClose={toggleShow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleShow} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            type="text"
            onChange={handleChange}
            value={login.username || ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
            value={login.password || ''}
          />

          {/* <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                type="checkbox"
                onChange={handleChange}
              />
            }
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" onClick={toggleShow}>
                Forgot password?
              </Link>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Belum punya akun? "}
                  <Link
                    to="#"
                    color="inherit"
                    href="#"
                    onClick={changeHasAccount}
                  >
                    Silakan registrasi disini.
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  useEffect(() => {
    document.title = "Liquid Enjiniring | Register ";
  });
  const classes = useStyles();
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  const changeHasAccount = () => {
    setAuth({ ...auth, hasAccount: !auth.hasAccount });
  };
  const [data, setData] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
    c_password: null,
  });


  // Handle Change
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setData({ ...data, name: e.target.value });
        break;
      case 'username':
        setData({ ...data, username: e.target.value });
        break;
      case 'email':
        setData({ ...data, email: e.target.value });
        break;
      case 'password':
        setData({ ...data, password: e.target.value });
        break;
      case 'c_password':
        setData({ ...data, c_password: e.target.value });
        break;
      default:
    }
  }

  // Input Validation
  const inputValidate = () => {
    if (data.name && data.username && data.email && data.password && data.c_password) {
      if (data.username.length < 4) {
        setError('Username tidak boleh kurang dari 4 karakter');
        toggleShow();
      }
      else if (data.password !== data.c_password) {
        setError('Password dan konfirmasi password harus sama!');
        toggleShow();
      } else {
        setError('');
        return true
      }
    } else {
      setError('Semua kolom harus diisi!');
      toggleShow();
    }
  }

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValidate()) {
      Axios.post(auth.registerUrl, data)
        .then((res) => {
          // console.log('success');
          setData({
            name: null,
            username: null,
            email: null,
            password: null,
            c_password: null,
          })
          setAuth({ ...auth, hasAccount: true });
        })
        .catch((err) => {
          const error = err.response.data.error;
          if (error.email) {
            setError(error.email);
            toggleShow();
          } else if (error.username) {
            setError(error.username);
            toggleShow();
          } else {
            setError('');
          }
        });
    }
  }

  if (!auth.isLoggedIn) {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  onChange={handleChange}
                  value={data.name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  value={data.username || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={data.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={data.password || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="c_password"
                  label="Confirm Password"
                  type="password"
                  id="c_password"
                  onChange={handleChange}
                  value={data.c_password || ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="body2" color="textSecondary" align="center">
                  {"Sudah punya akun? "}
                  <Link to='#' color="inherit" href="#" onClick={changeHasAccount}>
                    Silakan login disini.
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  } else {
    return (
      <Redirect to='/dashboard' />
    )
  }
};

export default Register;

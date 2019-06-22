import * as React from "react";
import {
  Avatar,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Button,
  Paper
} from "@material-ui/core";
import "./auth.css";
const logo = require("./images/logo.png");

interface AuthPageState {
  login: string;
  password: string;
}

class AuthPage extends React.Component<any, AuthPageState> {
  state = {
    login: "",
    password: ""
  };

  auth(event) {
    this.props.history.push("/panel");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper className="paper">
            <img src={logo} alt="Logo" className="avatar" />
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <form className="form" onSubmit={event => this.auth(event)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoFocus
                autoComplete="login"
                value={this.state.login}
                onChange={login => this.setState({ login: login.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={password =>
                  this.setState({ password: password.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Войти
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default AuthPage;

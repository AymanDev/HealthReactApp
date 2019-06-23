import * as React from "react";
import "./auth.css";
const logo = require("./images/logo.png");
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Alert
} from "react-bootstrap";
import axios from "axios";
import { URL_DOMAIN, AUTH, AuthRequest, postData } from "../../Helper";

interface AuthPageState {
  login: string;
  password: string;
  validated: boolean;
  loginError: boolean;
}

class AuthPage extends React.Component<any, AuthPageState> {
  state = {
    login: "",
    password: "",
    validated: false,
    loginError: false
  };

  componentDidMount() {
    const login = localStorage.getItem("login");
    const password = localStorage.getItem("password");

    if (login !== null && password !== null) {
      this.setState({
        login: localStorage.getItem("login"),
        password: localStorage.getItem("password")
      });
    }
  }

  async auth(event) {
    event.preventDefault();
    event.stopPropagation();

    const data: AuthRequest = {
      login: this.state.login,
      pass: this.state.password
    };
    const responseData = await postData(URL_DOMAIN + AUTH, data);
    if (responseData === null) {
      this.setState({ loginError: true });
      return;
    }

    localStorage.setItem("userData", responseData);
    localStorage.setItem("login", this.state.login);
    localStorage.setItem("password", this.state.password);
    this.props.history.push("/panel");
  }

  async handleSubmit(event) {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.checkValidity()) {
      this.auth(event);
    }
    this.setState({ validated: true, loginError: true });
  }

  render() {
    const { validated } = this.state;

    return (
      <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Image src={logo} alt="Logo" className="logo" />
        <Form
          noValidate
          validated={validated}
          onSubmit={event => this.handleSubmit(event)}
        >
          <Form.Group controlId="formLogin">
            <Form.Label>Логин:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Логин..."
              required
              minLength={6}
              maxLength={16}
              value={this.state.login}
              onChange={event => this.setState({ login: event.target.value })}
              className="input"
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста введите логин!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Пароль:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Пароль..."
              required
              minLength={6}
              maxLength={32}
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              className="input"
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста введите пароль!
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" block className="button">
            Войти
          </Button>
          {(() => {
            if (this.state.loginError) {
              return (
                <Alert variant="danger" className="mt-3">
                  Неверный логин и/или пароль!
                </Alert>
              );
            }
          })()}
        </Form>
      </Container>
    );
  }
}

export default AuthPage;

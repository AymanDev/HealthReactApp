import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Index from "./index";

interface AppState {
  [name: string]: any;
  regModalOpened: boolean;
  authModalOpened: boolean;
  mobileMenuOpened: boolean;
  login: string;
  password: string;
  repeatPassword: string;
  email: string;
  reponseAwait: boolean;
  error: boolean;
  errorMessages: {
    [key: string]: string;
  };
  currentPath: string;
}

class App extends React.Component<any, AppState> {
  state = {
    regModalOpened: false,
    authModalOpened: false,
    mobileMenuOpened: false,
    login: "",
    password: "",
    repeatPassword: "",
    email: "",
    reponseAwait: false,
    error: false,
    errorMessages: {},
    currentPath: "/"
  };

  showModal(modalName: string) {
    switch (modalName) {
      case "register":
        this.setState({
          regModalOpened: true
        });
        break;
      case "login":
        this.setState({
          authModalOpened: true
        });
        break;
    }
  }

  hideModal(modalName: string) {
    switch (modalName) {
      case "register":
        this.setState({
          regModalOpened: false
        });
        break;
      case "login":
        this.setState({
          authModalOpened: false
        });
        break;
    }
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  tryToRegister = () => {
    this.setState({
      reponseAwait: true,
      error: false,
      errorMessages: {}
    });

    const errorMessages = {};
    const { login, password, repeatPassword, email } = this.state;

    if (login.length < 3 || login.length > 16) {
      errorMessages["login"] =
        "Login must be longer than 3 and lower than 16 symbols!";
    }

    if (password.length < 6) {
      errorMessages["password"] = "Password length must be longer than 6!";
    }

    if (repeatPassword.length < 6) {
      errorMessages["repeatPassword"] =
        "Repeated password length must be longer than 6!";
    }

    if (repeatPassword !== password) {
      errorMessages["repeatPassword"] =
        "Repeated password are not matching with password!";
    }

    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegex.test(email)) {
      errorMessages["email"] = "Wrong email!";
    }

    if (Object.keys(errorMessages).length > 0) {
      this.setState({
        reponseAwait: false,
        error: true,
        errorMessages
      });
    }
  };

  tryToLogin = () => {
    this.setState({
      reponseAwait: true,
      error: false,
      errorMessages: {}
    });

    const errorMessages = {};
    const { login, password } = this.state;

    if (login.length < 3 || login.length > 16) {
      errorMessages["login"] =
        "Login must be longer than 3 and lower than 16 symbols!";
    }

    if (password.length < 6) {
      errorMessages["password"] = "Password length must be longer than 6!";
    }

    if (Object.keys(errorMessages).length > 0) {
      this.setState({
        reponseAwait: false,
        error: true,
        errorMessages
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log(this.props.location);
    this.setState({ currentPath: "/" });
  }

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />;
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

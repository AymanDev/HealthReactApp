import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage/auth";
import PanelPage from "./PanelPage/panel";
import axios from "axios";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AuthPage} />
          <Route exact path="/panel" component={PanelPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

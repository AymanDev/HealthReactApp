import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage/auth";
import { Grid, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import PanelPage from "./PanelPage/panel";

class App extends React.Component {
  theme = createMuiTheme({
    palette: {
      primary: {
        main: "#3a6fe8"
      },
      secondary: {
        main: "#FF3900"
      }
    }
  });

  public render() {
    return (
      <ThemeProvider theme={this.theme}>
        <BrowserRouter>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route exact path="/panel" component={PanelPage} />
              </Switch>
            </Grid>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;

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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

class PanelPage extends React.Component {
  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default PanelPage;

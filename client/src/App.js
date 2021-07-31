import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import AlertComponent from "./alertsetupcomponent";
import Project1Component from "./project1component";
import AdvisoryComponent from "./advisoryaddcomponent";
import AdvisoryListComponent from "./advisorylistcomponent";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - Case Study #1
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <Reorder />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/resetalerts" onClick={handleClose}>
              Reset Alerts
            </MenuItem>
            <MenuItem component={Link} to="/advisory" onClick={handleClose}>
              Add Advisory
            </MenuItem>
            <MenuItem
              component={Link}
              to="/listadvisories"
              onClick={handleClose}
            >
              List Advisories
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/resetalerts" render={() => <AlertComponent />} />
        <Route path="/home" component={Project1Component} />
        <Route path="/advisory" render={() => <AdvisoryComponent />} />
        <Route
          path="/listadvisories"
          render={() => <AdvisoryListComponent />}
        />
      </div>
    </MuiThemeProvider>
  );
};
export default App;

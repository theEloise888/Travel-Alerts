import React, { useReducer, useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  Typography,
  TextField,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import theme from "./theme";

import "./App.css";
import travelLogo from "./static/images/cards/travel.PNG";

const AlertComponent = () => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    alertMsg: "",
    contactServer: false,
    setupalerts: [],
    result: "",
    payload: "",
    resArr: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchAlerts();
  }, []);

  // for prod replace everything with "http://localhost:5000/graphql" to GRAPHURL

  const GRAPHURL = "/graphql";

  const fetchAlerts = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "running setup...",
        result: "",
        resArr: [],
      });

      //in non prod use "http://localhost:5000/graphql"
      //in prod use await fetch(GRAPHURL
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{setupalerts{results}}" }),
      });
      let json = await response.json();
      setState({
        snackBarMsg: "alerts setup collection complete",
        setupalerts: json.setupalerts,
        contactServer: true,
        result: json.data.setupalerts.results,
        resArr: json.data.setupalerts.results
          .replace(/([.])\s*(?=[A-Z])/g, "$1|")
          .split("|"),
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ contactServer: false });
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Card
        style={{
          marginTop: "20%",
          marginBottom: "10%",
          display: "block",
          overflowX: "scroll",
          flex: 1,
        }}
      >
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          direction="row"
          font=""
          style={{ minHeight: "50vh" }}
        >
          <img
            src={travelLogo}
            style={{ width: 250, height: 250 }}
            alt="logo"
          />
        </Grid>

        <Grid
          container
          spacing={4}
          align="center"
          justify="center"
          direction="column"
        >
          <Grid>
            <Typography variant="h5">World Wide Travel Alerts</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={11}
          align="right"
          justify="center"
          direction="column"
          fontWeight="bold"
        ></Grid>
        <CardHeader
          title="Alert Setup - Details"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          {/* <div>
            <p>
              <Typography color="error">
                {state.msg} {state.result}
              </Typography>
            </p>
          </div> */}
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {state.resArr.map((res, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" component="th" scope="row">
                        {res}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </MuiThemeProvider>
  );
};

export default AlertComponent;

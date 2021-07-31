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
  Button,
} from "@material-ui/core";

import theme from "./theme";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./App.css";
import travelLogo from "./static/images/cards/travel.PNG";

const AdvisoryComponent = () => {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    showMsg: false,
    contactServer: false,
    countries: [],
    result: [],
    names: [],
    selection: "",
    name: "",
    text: "",
    date: "",
    travelername: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCountries();
  }, []);

  let today = new Date();

  let currentDateTime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  // for prod replace everything with "http://localhost:5000/graphql" to GRAPHURL
  const GRAPHURL = "/graphql";

  const addAdvisory = async (text) => {
    try {
      // alert(
      //   JSON.stringify({
      //     query: `mutation {addadvisory(travelername: "${state.travelername}", name: "${state.selection}", date: "${currentDateTime}") {travelername,name,text,date}}`,
      //   })
      //);
      //in non production use let response = await fetch("http://localhost:5000/graphql"
      // in prod use await fetch(GRAPHURL
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // addadvisory(travelername: String, name: String, text: String, date: String): Advisory
          //addadvisory(travelername: "Rice Crackers", name: "Canada", date: "2020-02-13") {travelername,name,text,date}
          query: `mutation{addadvisory(travelername: "${state.travelername}", name: "${state.selection}", date: "${currentDateTime}"){travelername,name,text,date}}`,
        }),
      });
      let json = await response.json();
      setState({
        showMsg: true,
        snackbarMsg: json.msg,
        name: "",
        country: "",
        text: "",
        date: "",
        countries: "",
      });
      setState({
        snackBarMsg: `added advisory on ${currentDateTime}`,
        contactServer: true,
      });
    } catch (error) {
      setState({
        snackbarMsg: error.message,
        showMsg: true,
      });
    }
  };

  const fetchCountries = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load countries from server...",
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{countries{name}}" }),
      });

      let json = await response.json();
      //console.log(json);

      setState({
        showMsg: true,
        contactServer: true,
        countries: json.data.countries,
        result: json.data.countries.name,
        names: json.data.countries.map((a) => a.name),
        snackBarMsg: `found ${json.data.countries.length} countries`,
      });
      console.log("number of countries");
      console.log(json.data.countries.length);
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

  const onChange = (e, selectedOption) => {
    selectedOption
      ? setState({ selection: selectedOption.name })
      : setState({ selection: "" });
  };

  const handleNameInput = (e) => {
    setState({ travelername: e.target.value });
  };

  const emptyorundefined =
    state.travelername === undefined ||
    state.travelername === "" ||
    state.selection === undefined ||
    state.selection === "";

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
          <TextField
            style={{
              marginBottom: 20,
              marginLeft: 30,
              alignContent: "center",
            }}
            onChange={handleNameInput}
            placeholder="Traveller's name"
            value={state.travelername}
          />
          <Autocomplete
            options={state.countries}
            getOptionLabel={(option) => option.name}
            style={{
              width: 300,
              marginLeft: 30,
              float: "center",
            }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="countries"
                variant="outlined"
                fullWidth
              />
            )}
          />

          <br />
          <Button
            variant="contained"
            placeholder="ADD ADVISORY"
            color="secondary"
            style={{
              marginTop: 20,
              marginBottom: 30,
              marginLeft: 110,
              float: "center",
            }}
            onClick={addAdvisory}
            disabled={emptyorundefined}
          >
            ADD ADVISORY
          </Button>
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

//an array to hold the sentence
const allCountries = [];

export default AdvisoryComponent;

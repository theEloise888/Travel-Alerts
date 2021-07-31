import React, { useReducer, useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  Typography,
  Select,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";

import theme from "./theme";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./App.css";
import travelLogo from "./static/images/cards/travel.PNG";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import Container from "@material-ui/core/Container";

const AdvisoryListComponent = (props) => {
  const sendParentSomeData = () => {
    props.dataFromChild("");
  };
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
    travelerprop: "",
    radiogroupval: "categories",
    advisories: [],
    resArr: [],
    travelers: [],
    loadData: [],
    itemSelected: "",
    region: "",
    subregion: "",
    alertsfortraveler: [],
    regions: [],
    subregions: [],
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {}, []);

  const [radioButtonValue, setRadio] = useState("");
  const [autocompleteValue, setAutocomplete] = useState("");

  //prod
  const GRAPHURL = "/graphql";

  // non prod
  //"http://localhost:5000/graphql"

  const fetchAlertsForTravelers = async (itemSelected) => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load alerts for travelers...",
        loadData: [],
        resArr: [],
      });

      // alert(
      //   JSON.stringify({
      //     //alertsfortraveler(travelername: String): [Advisory]
      //     query: `{alertsfortraveler(travelername:"${itemSelected}"){travelername,name,text,date}}`,
      //   })
      // );

      //in non prod use http://localhost:5000/graphql
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{alertsfortraveler(travelername:"${itemSelected}"){travelername,name,text,date}}`,
        }),
      });

      let json = await response.json();

      // console.log(json);

      const real_data = [];

      // bind the value to the travelername
      for (let option of state.resArr) {
        real_data.push({
          value: option,
        });
      }

      setState({
        snackBarMsg: `found ${json.data.alertsfortraveler.length} alerts for ${itemSelected}`,
      });

      setState({
        showMsg: true,
        contactServer: true,
        alertsfortraveler: json.alertsfortraveler,
        resArr: json.data.alertsfortraveler,
        loadData: real_data,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const fetchTravelers = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load travelers from server...",
        loadData: [],
        resArr: [],
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "{travelers{travelername,name,text,date}}",
        }),
      });

      let json = await response.json();

      // bind the value to the travelername
      for (let option of json.data.travelers) {
        option["value"] = option.travelername;
      }

      //console.log(json);
      setState({
        showMsg: true,
        travelers: json.data.travelers,
        contactServer: true,
        loadData: json.data.travelers,
      });

      setState({
        showMsg: true,
        contactServer: true,
        snackBarMsg: `found ${json.data.travelers.length} travellers`,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const fetchRegions = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load regions from server...",
        loadData: [],
        resArr: [],
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "{regions}",
        }),
      });

      let json = await response.json();

      const real_data = [];

      // bind the value to the region
      for (let option of json.data.regions) {
        real_data.push({
          value: option,
        });
      }

      setState({
        showMsg: true,
        regions: json.regions,
        contactServer: true,
        loadData: real_data,
      });

      setState({
        contactServer: true,
        showMsg: true,
        snackBarMsg: `found ${json.data.regions.length} regions`,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const fetchAlertsForRegions = async (itemSelected) => {
    try {
      // alert(
      //   JSON.stringify({
      //     query: `{alertsforregion(region:"${itemSelected}"){country,name,text,date,region,subregion}}`,
      //   })
      // );

      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load alerts for regions...",
        loadData: [],
        resArr: [],
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{alertsforregion(region:"${itemSelected}"){country,name,text,date,region,subregion}}`,
        }),
      });

      let json = await response.json();

      // console.log(json);

      const real_data = [];

      // bind the value to the region
      for (let option of state.resArr) {
        real_data.push({
          value: option,
        });
      }

      setState({
        showMsg: true,
        contactServer: true,
        alertsforregion: json.alertsforregion,
        loadData: real_data,
        resArr: json.data.alertsforregion,
      });

      setState({
        snackBarMsg: `found ${json.data.alertsforregion.length} alerts for ${itemSelected}`,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const fetchSubRegions = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load sub regions from server...",
        loadData: [],
        resArr: [],
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "{subregions}",
        }),
      });

      let json = await response.json();

      const real_data = [];

      // bind the value to the subregion
      for (let option of json.data.subregions) {
        real_data.push({
          value: option,
        });
      }

      setState({
        showMsg: true,
        subregions: json.subregions,
        contactServer: true,
        loadData: real_data,
      });

      setState({
        showMsg: true,
        contactServer: true,
        snackBarMsg: `found ${json.data.subregions.length} sub regions`,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const fetchAlertsForSubRegions = async (itemSelected) => {
    try {
      // alert(
      //   JSON.stringify({
      //     query: `{alertsforsubregion(subregion:"${itemSelected}"){country,name,text,date,region,subregion}}`,
      //   })
      // );

      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load alerts for sub regions...",
        loadData: [],
        resArr: [],
      });

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{alertsforsubregion(subregion:"${itemSelected}"){country,name,text,date,region,subregion}}`,
        }),
      });

      let json = await response.json();

      // console.log(json);

      const real_data = [];

      // bind the value to the region
      for (let option of state.resArr) {
        real_data.push({
          value: option,
        });
      }

      setState({
        showMsg: true,
        contactServer: true,
        alertsforsubregion: json.alertsforsubregion,
        loadData: real_data,
        resArr: json.data.alertsforsubregion,
      });

      setState({
        snackBarMsg: `found ${json.data.alertsforsubregion.length} alerts for ${itemSelected}`,
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  // to handle retrieve of names
  const handleRadioGroupChange = (e, selectedOption) => {
    setRadio(e.target.value);

    if (selectedOption) {
      if (e.target.value === "travellers") {
        fetchTravelers();
      } else if (e.target.value === "regions") {
        fetchRegions();
      } else {
        fetchSubRegions();
      }
    }

    setState({
      autocompleteValue: "",
      radioButtonValue: e.target.value,
      loadData: [],
      resArr: [],
    });
  };

  //retrieve alerts
  const handleOnChangeForAlerts = (e, selectedOption) => {
    if (selectedOption) {
      setAutocomplete(selectedOption.value);
      if (radioButtonValue === "travellers") {
        fetchAlertsForTravelers(selectedOption.value);
      } else if (radioButtonValue === "regions") {
        fetchAlertsForRegions(selectedOption.value);
      } else {
        fetchAlertsForSubRegions(selectedOption.value);
      }
    } else {
      if (radioButtonValue === "travellers") {
        fetchTravelers();
      } else if (radioButtonValue === "regions") {
        fetchRegions();
      } else {
        fetchSubRegions();
      }
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
    margin: {
      margin: theme.spacing(-1),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  });

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Card style={{ marginTop: "20%", marginBottom: "10%" }}>
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
          title="List Advisories By:"
          style={{ color: "secondary", textAlign: "center" }}
        />
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Alert severity="info">
                <strong> Note: </strong>
                When changing the dropdown options. Please click the "x" to
                refresh the data.
              </Alert>
            </Paper>
          </Grid>
        </Grid>
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend"> </FormLabel>
            <RadioGroup
              style={{
                width: "auto",
                height: "auto",
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "row",
                marginBottom: 10,
                color: "secondary",
              }}
              aria-label="categories"
              onChange={handleRadioGroupChange}
            >
              <FormControlLabel
                colour="secondary"
                value="travellers"
                control={<Radio />}
                label="Traveller"
                labelPlacement="start"
              />
              <FormControlLabel
                colour="secondary"
                value="regions"
                control={<Radio />}
                label="Region"
                labelPlacement="start"
              />
              <FormControlLabel
                colour="secondary"
                value="subregions"
                control={<Radio />}
                label="Sub-Region"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>

          <Autocomplete
            id="id"
            color="secondary"
            freeSolo={false}
            options={state.loadData}
            value={radioButtonValue}
            getOptionLabel={(option, value) =>
              option.value ? option.value : ""
            }
            getOptionSelected={(option, value) => option.value === value}
            style={{
              width: 300,
              marginLeft: 30,
              float: "center",
            }}
            onChange={(e, selectedOption) => {
              handleOnChangeForAlerts(e, selectedOption);
            }}
            renderInput={(option, index) => (
              <TextField
                {...option}
                className={classes.margin}
                id={index}
                variant="outlined"
                label={radioButtonValue}
                fullWidth
                value={autocompleteValue}
              />
            )}
          />

          <br />

          <div>
            <TableContainer component={Paper}>
              <Table
                color="secondary"
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Country</TableCell>
                    <TableCell align="left">Alert Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.resArr.map((res, index) => (
                    <TableRow key={index}>
                      <TableCell align="left" component="th" scope="row">
                        {res.name}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {res.text} <br /> {res.date}
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
        autoHideDuration={800}
        onClose={snackbarClose}
      />
    </MuiThemeProvider>
  );
};

export default AdvisoryListComponent;

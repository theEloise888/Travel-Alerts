import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@material-ui/core";

import theme from "./theme";
import travelLogo from "./static/images/cards/travel.PNG";

const Project1HomeComponent = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Card style={{ marginTop: "20%", display: "block", flex: 1 }}>
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
        >
          <Grid>
            <i>
              <p>©INFO3139 - 2021</p>
            </i>
          </Grid>
        </Grid>
      </Card>
    </MuiThemeProvider>
  );
};
export default Project1HomeComponent;

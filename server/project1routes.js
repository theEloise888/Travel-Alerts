const { alertsCollectionFile } = require("./config");
const express = require("express");
const router = express.Router();
const dbRtns = require("./dbroutines");
const alertsRtns = require("./setup");

// define a default route to retrieve all alerts
router.get("/", async (req, res) => {
  try {
    let results = await alertsRtns.loadISOCountriesAndAlerts();
    res.status(200).send({ setupalerts: results });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all alerts failed - internal server error");
  }
});

module.exports = router;

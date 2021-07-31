const dbRtns = require("./dbroutines");
const alertsRtns = require("./setup");
const {
  countriesCollectionFile,
  alertsCollectionFile,
  advisoriesCollectionFile,
} = require("./config");
const resolvers = {
  countries: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, countriesCollectionFile, {}, {});
  },
  travelers: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, advisoriesCollectionFile, {}, {});
  },
  countrybyname: async (args) => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, countriesCollectionFile, {
      name: args.name,
    });
  },
  countrybycode: async (args) => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findOne(db, countriesCollectionFile, {
      code: args.code,
    });
  },

  addadvisory: async (args) => {
    let db = await dbRtns.loadDB();

    let findAlertText = await dbRtns.findOne(
      db,
      alertsCollectionFile,
      { name: args.name },
      {}
    );

    let str = findAlertText.text;

    let alertStr = str;

    let advisories = {
      travelername: args.travelername,
      name: args.name,
      date: args.date,
      text: alertStr,
    };
    let results = await dbRtns.addOne(db, advisoriesCollectionFile, advisories);
    console.log(results);

    return results.insertedCount === 1 ? advisories : null;
  },
  setupalerts: async () => {
    let db = await dbRtns.loadDB();
    let results = await alertsRtns.loadISOCountriesAndAlerts();
    // console.log(results);
    return results;
  },

  alerts: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(db, alertsCollectionFile, {}, {});
  },
  alertsforregion: async (args) => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findAll(
      db,
      alertsCollectionFile,
      {
        region: args.region,
      },
      {}
    );
  },

  alertsforsubregion: async (args) => {
    let db = await dbRtns.loadDB();

    return await dbRtns.findAll(
      db,
      alertsCollectionFile,
      {
        subregion: args.subregion,
      },
      {}
    );
  },

  alertsfortraveler: async (args) => {
    let db = await dbRtns.loadDB();

    return await dbRtns.findAll(
      db,
      advisoriesCollectionFile,
      {
        travelername: args.travelername,
      },
      {}
    );
  },
  regions: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findUniqueValues(db, alertsCollectionFile, "region");
  },

  subregions: async () => {
    let db = await dbRtns.loadDB();
    return await dbRtns.findUniqueValues(db, alertsCollectionFile, "subregion");
  },
};
module.exports = { resolvers };

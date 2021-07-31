const dbRtns = require("./utilities");

const {
  alertsRawData,
  countriesRawData,
  atlas,
  appdb,
  alertsCollectionFile,
  countriesCollectionFile,
} = require("./config");

let jsonStr = "";

const loadISOCountriesAndAlerts = async () => {
  try {
    let allCountries = await dbRtns.getJSONFromWWWPromise(countriesRawData);

    //Obtain the ALERT JSON from the GOC site.
    let allAlerts = await dbRtns.getAlertJSONFromWWWPromise(alertsRawData);
    db = await dbRtns.loadDB();
    let results = await dbRtns.deleteAll(db, alertsCollectionFile);
    // console.log(
    //   `Deleted ${results.deletedCount} documents from ${alertsCollectionFile} collection`
    // );
    jsonStr += `Deleted ${results.deletedCount} documents from ${alertsCollectionFile} collection. `;

    // access country code
    let codes = [];

    await Promise.allSettled(
      allCountries.map(async (country) => {
        let temp = country["alpha-2"];
        //console.log(temp);
        if (allAlerts.data[temp] != null) {
          codes.push({
            country: country["alpha-2"],
            name: country.name,
            text: allAlerts.data[temp].eng["advisory-text"],
            date: allAlerts.data[temp]["date-published"].date,
            region: country.region,
            subregion: country["sub-region"],
          });
        } else {
          codes.push({
            country: country["alpha-2"],
            name: country.name,
            text: "No travel alerts",
            date: "",
            region: country.region,
            subregion: country["sub-region"],
          });
        }
      })
    );

    jsonStr += `Retrieved ${alertsCollectionFile} JSON from remote web site.`;
    jsonStr += `Retrieved ${countriesCollectionFile} JSON from remote web site.`;

    // console.log(
    //   `Retrieved ${alertsCollectionFile} JSON from  remote web site.`
    // );

    // console.log(
    //   `Retrieved ${countriesCollectionFile} JSON from  remote web site.`
    // );

    //add each country to the alert collection
    await Promise.allSettled(
      codes.map(async (doc) => {
        await dbRtns.addOne(db, alertsCollectionFile, doc);
      })
    );

    // display the number of documents added to the alerts collection
    let allDbCountries = await dbRtns.findAll(db, alertsCollectionFile, {}, {});
    // console.log(
    //   `Added approximately ${allDbCountries.length} new documents to the ${alertsCollectionFile} collection.`
    // );
    jsonStr += `Added approximately ${allDbCountries.length} new documents to the ${alertsCollectionFile} collection.`;
  } catch (err) {
    console.log(err);
  } finally {
    return { results: jsonStr };
  }
};

module.exports = { loadISOCountriesAndAlerts };

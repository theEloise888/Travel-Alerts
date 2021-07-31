const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  alertsRawData: process.env.GOCALERTS,
  countriesRawData: process.env.ISOCOUNTRIES,
  countriesJsonFile: process.env.COUNTRIES,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  alertsCollectionFile: process.env.ALERTCOLLECTION,
  countriesCollectionFile: process.env.COUNTRIESCOLLECTION,
  usersCollectionFile: process.env.USERSCOLLECTION,
  graphql: process.env.GRAPHQLURL,
  advisoriesCollectionFile: process.env.ADVISORYCOLLECTION,
  server: process.env.SERVER,
};

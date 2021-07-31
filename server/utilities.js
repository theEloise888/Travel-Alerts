const got = require("got");

const MongoClient = require("mongodb").MongoClient;
const { atlas, appdb } = require("./config");
const loadDB = async () => {
  let db;
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    console.log("establishing new connection to Atlas");
    const conn = await MongoClient.connect(atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = conn.db(appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

//Retrieve the ISO countries alert data
const getJSONFromWWWPromise = async (code) => {
  code = "https://raw.githubusercontent.com/elauersen/info3139/master/isocountries.json";
  const body = await got(code, { responseType: "json", resolveBodyOnly: true });
  return body;
};

const getAlertJSONFromWWWPromise = async (code) => {
  code = "http://data.international.gc.ca/travel-voyage/index-alpha-eng.json";
  const body = await got(code, { responseType: "json", resolveBodyOnly: true });
  return body;
};

const findAll = (db, coll, criteria, projection) =>
  db.collection(coll).find(criteria).project(projection).toArray();

const deleteAll = (db, coll) => db.collection(coll).deleteMany({});

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);

const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);

module.exports = {
  loadDB,
  addOne,
  deleteAll,
  findOne,
  findAll,
  getJSONFromWWWPromise,
  getAlertJSONFromWWWPromise,
};

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
const getISOAlertsJSONFromWWWPromise = async (code) => {
  const body = await got(code, { responseType: "json", resolveBodyOnly: true });
  return body;
};

const findAll = (db, coll, criteria, projection) =>
  db.collection(coll).find(criteria).project(projection).toArray();

const deleteAll = (db, coll) => db.collection(coll).deleteMany({});

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);

const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);

const updateOne = (db, coll, criteria, projection) =>
  db
    .collection(coll)
    .findOneAndUpdate(criteria, { $set: projection }, { rawResult: true });

const deleteOne = (db, coll, criteria) =>
  db.collection(coll).deleteOne(criteria);

const findUniqueValues = (db, coll, field) =>
  db.collection(coll).distinct(field);

module.exports = {
  loadDB,
  addOne,
  deleteAll,
  findOne,
  findAll,
  getISOAlertsJSONFromWWWPromise,
  updateOne,
  deleteOne,
  findUniqueValues,
};

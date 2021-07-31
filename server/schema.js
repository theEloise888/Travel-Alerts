const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
countries: [Country],
countrybycode(code: String): Country,
countrybyname(name: String): Country,
setupalerts: Results,
alerts: [Alert],
alertsforregion(region: String): [Alert],
alertsforsubregion(subregion: String): [Alert],
regions: [String],
subregions: [String],
travelers: [Advisory],
alertsfortraveler(travelername: String): [Advisory]
}

type Travelernames {
    travelername: String
}

type Results {
    results: String
}
type Country {
code: String
name: String
}
type Advisory {
    travelername: String
    name: String
    text: String
    date: String 
}

type Alert {
    country: String
    name: String
    text: String
    date: String
    region: String
    subregion: String    
}

type Mutation  {
    addadvisory(travelername: String, name: String, date: String): Advisory
}



`);
module.exports = { schema };

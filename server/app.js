const path = require("path"); // needed for refresh
//for non prod
const cors = require("cors");
const { server, port, graphql } = require("./config");
const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const app = express();
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
//for non prod
//app.use(cors());

//prod only
app.use(express.static("public"));

//use only in production
//uncomment in non prod use
app.get("*", (request, response) => {
  // needed for refresh
  response.sendFile(path.join(__dirname, "public/index.html"));
});

app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.listen(port);

//non prod only
//console.log(`Server ready on localhost:${port}${graphql}`);

//prod only
console.log(
  `Server ready at ${server}:${port}${graphql} - ${process.env.NODE_ENV}`
);

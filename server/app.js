const express = require("express");
const app = express();

const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");


//  MONGO Connection
const Mongo_Server = async () => {
  const typeDefs = gql( fs.readFileSync("./TypeDefs/mongo_schema.graphql", { encoding: "utf-8" }) );
  const resolvers = require("./Resolvers/mongo_resolvers");

  const { connection } = require("./DB_proccess/MongoProccess");
  connection();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app, path: "/graphql_0" });
};
Mongo_Server();

// MYSQL Connection
const Mysql_Server = async () => {
  const typeDefs = gql( fs.readFileSync("./TypeDefs/mysql_schema.graphql", { encoding: "utf-8" }) );
  const resolvers = require("./Resolvers/mysql_resolvers");

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app, path: "/graphql" });
};
Mysql_Server();

//  Define Server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 500;
app.listen(port, () => console.log(`Server runs on port ${port}`));

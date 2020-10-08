const { ApolloServer } = require("apollo-server-micro");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const cors = require("micro-cors")();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = apolloServer.createHandler({
  path: "/api/graphql",
});
module.exports = cors((req, res) =>
    req.method === "OPTIONS" ? res.end() : handler(req, res)
);
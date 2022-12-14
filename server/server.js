const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()


//importing components
const graphqlSchema = require('./graphQL/graphQLSchema/gs-index')
const graphqlResolvers = require('./graphQL/graphQLResolvers/gr-index')

//
const app = express();

//importing .env file
const MONGO_DB = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

//importing graphql
app.use(
    '/',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue:graphqlResolvers,
      graphiql: true
    })
)
async function run() {
  // Create a new connection and connect to MongoDB...
  const conn = await mongoose.
    createConnection(MONGO_DB).
    asPromise().then((res)=>{
      console.log("server is connected", res.models)
    }).catch((err)=>{
      console.log("Failed to connect the server", err)
    })
  console.log("mongodb is connected")
}
run()
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
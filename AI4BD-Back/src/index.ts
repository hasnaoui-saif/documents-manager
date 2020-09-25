/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DocmentResolver } from "./resolvers/DocumentResolver";
import { PageResolver } from "./resolvers/PagesResolver";
import mongoose from "mongoose";
import MONGO from "./dbConfig";

(async () => {
  const cors = require('cors');
  const app = express();
  app.use(cors());


  mongoose.connect(
    `mongodb://${MONGO.USRENAME}:${MONGO.PASSWORD}@${MONGO.HOST}/${MONGO.DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("connected to mongo");
    }
  ); // connect to database

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DocmentResolver, PageResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4001;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();

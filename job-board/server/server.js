import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth.js";
import { resolvers } from "./resolvers.js";
import { getUser } from "./db/users.js";
import { createCompanyLoader } from "./db/companies.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf-8");

const aplloServer = new ApolloServer({ typeDefs, resolvers });
await aplloServer.start();

const getContext = async ({ req }) => {
  const companyLoader = createCompanyLoader();
  const context = {
    companyLoader,
  };

  if (!req.auth) {
    return context;
  }

  const user = await getUser(req.auth.sub);
  context.user = user;

  return context;
};

app.use("/graphql", apolloMiddleware(aplloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});

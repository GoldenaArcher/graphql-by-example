import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
    # schema
    schema {
        query: Query
    }
    
    # implementation
    type Query {
        greeting: String
    }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const info = await startStandaloneServer(server, { listen: { port: 9000 } });

console.log(`🚀  Server ready at: ${info.url}`);

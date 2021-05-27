import { ApolloClient, InMemoryCache } from '@apollo/client';

export const mongodbClient = new ApolloClient({
  // uri: 'http://localhost:4001/graphql',
  uri: process.env.MONGODB_API_URL,
  cache: new InMemoryCache(),
});

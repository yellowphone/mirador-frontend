import { ApolloClient, InMemoryCache } from '@apollo/client';

export const mongodbClient = new ApolloClient({
  uri: process.env.MONGODB_API_URL,
  cache: new InMemoryCache(),
});

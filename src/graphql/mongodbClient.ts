import { ApolloClient, InMemoryCache } from '@apollo/client';

require('dotenv').config();

export const mongodbClient = new ApolloClient({
  uri: process.env.REACT_APP_MONGODB_API_URL,
  cache: new InMemoryCache(),
});

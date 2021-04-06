import { ApolloClient, InMemoryCache } from '@apollo/client';

export const mongodbClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache(),
});

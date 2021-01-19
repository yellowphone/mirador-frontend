import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getUserContext } from '../utils/userContext';

const authLink = setContext((_, { headers }) => {
  const token = getUserContext()?.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link: authLink,
});
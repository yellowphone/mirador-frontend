import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { getUserContext } from '../utils/userContext';

const uploadLink = createUploadLink({
  uri: process.env.BACKEND_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getUserContext()?.access_token;

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

// this type coercion is gross, but apollo-upload-client and @apollo/client have mismatched types!
const link = ApolloLink.from([(uploadLink as unknown) as ApolloLink, authLink]);

export const client = new ApolloClient({
  uri: process.env.BACKEND_API_URL,
  cache: new InMemoryCache(),
  link: link,
});

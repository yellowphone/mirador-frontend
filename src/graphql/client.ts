import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { getUserContext } from '../utils/userContext';

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
})

const authLink = setContext((_, { headers }) => {
  const token = getUserContext()?.accessToken;

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
});

const link = ApolloLink.from([
  uploadLink,
  authLink
]);

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link: link
});

// <<<<<<< blogs
//   link: uploadLink
// =======
//   link: authLink,
// >>>>>>> main
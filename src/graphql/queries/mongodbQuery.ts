import { gql } from '@apollo/client';

export const FIND_MONGODB_TRIP = gql`
  query findTrip($id: String) {
    findTrip(id: $id)
  }
`;

export const FIND_MONGODB_BLOG = gql`
  query findBlog($id: String) {
    findBlog(id: $id)
  }
`;

import { gql } from '@apollo/client';

export const FIND_MONGODB_ITINERARY = gql`
    query findItinerary($id: String) {
        findItinerary(id: $id)
    }
`;

export const FIND_MONGODB_BLOG = gql`
    query findBlog($id: String) {
        findBlog(id: $id)
    }
`;
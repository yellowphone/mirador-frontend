import { gql } from '@apollo/client';

export const FIND_MONGODB_ITINERARY = gql`
    query findItinerary($id: String) {
        findItinerary(id: $id)
    }
`;
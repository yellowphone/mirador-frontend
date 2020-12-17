import { gql } from '@apollo/client';

export const FIND_ITINERARY_BY_ID = gql`
    query findItineraryById($pkitinerary: Int!) {
        findItineraryById(pkitinerary: $pkitinerary) {
            pkitinerary
            title
            summary
            created_on
            user_itineraries {
                users {
                    username
                }
            }
        }
    }
`;
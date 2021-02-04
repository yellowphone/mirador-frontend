import { gql } from '@apollo/client';

export const FIND_ITINERARY_BY_ID = gql`
    query findItineraryById($pkitinerary: Int!) {
        findItineraryById(pkitinerary: $pkitinerary) {
            pkitinerary
            title
            summary
            content
            created_on
            user_itineraries {
                users {
                    username
                }
            }
            itinerary_tags {
                pkitinerary_tag
                tags {
                    tag
                }
            }
            users {
                pkuser
            }
            itinerary_experiences {
                experiences {
                    pkexperience
                }
            }
        }
    }
`;
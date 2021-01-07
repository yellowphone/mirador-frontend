import { gql } from '@apollo/client';

export const FIND_ADVENTURE_BY_ID = gql`
    query findAdventureById($pkadventure: Int!) {
        findAdventureById(pkadventure: $pkadventure) {
            pkadventure
            title
            summary
            created_on
            locations {
                lat
                lng
            }
            miles
            elevation
            climbing
            difficulty
            adventure_images {
                images {
                    url
                }
            }
            review_adventures {
                rating
                content
                users {
                    username
                }
            }
        }
    }
`;

export const FIND_ADVENTURE_BY_COORDINATES = gql`
    query findAdventureByCoordinates($lat: Float!, $lng: Float!) {
        findAdventureByCoordinates(lat: $lat, lng: $lng) {
            lat
            lng
            fk_adventure_location
            distance
            title
            summary
            created_on
            miles
            elevation
            climbing
            difficulty
        }
    }
`;
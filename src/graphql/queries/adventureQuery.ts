import { gql } from '@apollo/client';

export const FIND_ADVENTURE_BY_COORDINATES = gql`
    query findAdventureByCoordinates($lat: Float!, $lng: Float!) {
        findAdventureByCoordinates(lat: $lat, lng: $lng) {
            title
            distance
            lat
            lng
        }
    }
`;
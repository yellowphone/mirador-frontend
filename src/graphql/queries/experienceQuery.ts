import { gql } from '@apollo/client';

export const FIND_EXPERIENCE_BY_ID = gql`
    query findExperienceById($pkexperience: Int!) {
        findExperienceById(pkexperience: $pkexperience) {
            pkexperience
            title
            summary
            created_on
            experience_locations {
                lat
                lng
            }
            miles
            elevation
            climbing
            difficulty
            experience_images {
                images {
                    url
                }
            }
            review_experiences {
                rating
                content
                users {
                    username
                }
            }
            experience_tags {
                pkexperience_tag
                tags {
                  tag
                }
            }
        }
    }
`;

export const FIND_EXPERIENCE_BY_TITLE = gql`
    query findExperienceByTitle($title: String!) {
        findExperienceByTitle(title: $title) {
            pkexperience
            title
        }
    }
`;

export const FIND_EXPERIENCE_BY_COORDINATES = gql`
    query findExperienceByCoordinates($lat: Float!, $lng: Float!) {
        findExperienceByCoordinates(lat: $lat, lng: $lng) {
            lat
            lng
            fk_experience_location
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
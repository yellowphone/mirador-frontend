import { gql } from '@apollo/client';

export const FIND_ITINERARY_BY_ID = gql`
  query findItineraryById($pkitinerary: Int!) {
    findItineraryById(pkitinerary: $pkitinerary) {
      pkitinerary
      title
      summary
      mongoid
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
    }
  }
`;

export const FIND_ITINERARIES_FOR_USER = gql`
  query findUser($pkuser: Int!) {
    findUser(pkuser: $pkuser) {
      pkuser
      itineraries {
        pkitinerary
        title
      }
    }
  }
`;

export const FIND_ITINERARY_BY_PUBLIC_IDENTIFIER = gql`
  query findItineraryByPublicIdentifier($public_identifier: String!) {
    findItineraryByPublicIdentifier(public_identifier: $public_identifier) {
      pkitinerary
      title
      summary
      mongoid
      created_on
      public_identifier
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
          title
          public_identifier
          experience_images {
            images {
              url
            }
          }
          experience_tags {
            tags {
              tag
            }
          }
        }
      }
    }
  }
`;

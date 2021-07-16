import { gql } from '@apollo/client';

export const FIND_TRIP_BY_ID = gql`
  query findTripById($pktrip: Int!) {
    findTripById(pktrip: $pktrip) {
      pktrip
      title
      summary
      mongoid
      created_on
      user_trips {
        users {
          username
        }
      }
      trip_tags {
        pktrip_tag
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

export const FIND_TRIPS_FOR_USER = gql`
  query findUser($pkuser: Int!) {
    findUser(pkuser: $pkuser) {
      pkuser
      trips {
        pktrip
        public_identifier
        title
      }
    }
  }
`;

export const FIND_MANY_TRIPS = gql`
  query findManyTrips {
    findManyTrips {
      title
      public_identifier
      trip_tags {
        tags {
          tag
        }
      }
    }
  }
`;

export const FIND_TRIP_BY_PUBLIC_IDENTIFIER = gql`
  query findTripByPublicIdentifier($public_identifier: String!) {
    findTripByPublicIdentifier(public_identifier: $public_identifier) {
      pktrip
      title
      summary
      mongoid
      created_on
      public_identifier
      user_trips {
        users {
          username
        }
      }
      trip_tags {
        pktrip_tag
        tags {
          tag
        }
      }
      users {
        pkuser
      }
      trip_experiences {
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

import { gql } from '@apollo/client';

export const CREATE_TRIP = gql`
  mutation createTrip(
    $title: String
    $summary: String
    $mongoid: String
    $tags: [Int]
    $pkuser: Int!
  ) {
    createTrip(
      title: $title
      summary: $summary
      mongoid: $mongoid
      tags: $tags
      pkuser: $pkuser
    ) {
      pktrip
      public_identifier
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation updateTrip(
    $public_identifier: String!
    $title: String
    $mongoid: String
  ) {
    updateTrip(
      public_identifier: $public_identifier
      title: $title
      mongoid: $mongoid
    ) {
      public_identifier
      title
      mongoid
    }
  }
`;

export const ADD_EXPERIENCE_TO_TRIP = gql`
  mutation addExperineceToTrip($pkexperience: Int!, $pktrip: Int!) {
    addExperienceToTrip(pkexperience: $pkexperience, pktrip: $pktrip) {
      pktrip_experience
    }
  }
`;

export const SAVE_TRIP = gql`
  mutation saveTrip($saving_user: Int!, $saving_trip: Int!) {
    saveTrip(saving_user: $saving_user, saving_trip: $saving_trip)
  }
`;

export const UNSAVE_TRIP = gql`
  mutation unsaveTrip($pksaved_trip: Int!) {
    unsaveTrip(pksaved_trip: $pksaved_trip)
  }
`;

export const ADD_USER_TO_TRIP = gql`
  mutation addUserToTrip($adding_user: Int!, $adding_trip: Int!) {
    addUserToTrip(adding_user: $adding_user, adding_trip: $adding_trip)
  }
`;

export const DELETE_USER_FROM_TRIP = gql`
  mutation deleteUserFromTrip($pkuser_trip: Int!) {
    deleteUserFromTrip(pkuser_trip: $pkuser_trip)
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($pktrip: Int!) {
    deleteTrip(pktrip: $pktrip)
  }
`;

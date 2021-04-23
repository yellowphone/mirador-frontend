import { gql } from '@apollo/client';

export const CREATE_ITINERARY = gql`
  mutation createItinerary(
    $title: String
    $summary: String
    $mongoid: String
    $tags: [Int]
    $pkuser: Int!
  ) {
    createItinerary(
      title: $title
      summary: $summary
      mongoid: $mongoid
      tags: $tags
      pkuser: $pkuser
    ) {
      pkitinerary
      public_identifier
    }
  }
`;

export const UPDATE_ITINERARY = gql`
  mutation updateItinerary(
    $public_identifier: String!
    $title: String
    $mongoid: String
  ) {
    updateItinerary(
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

export const ADD_EXPERIENCE_TO_ITINERARY = gql`
  mutation addExperineceToItinerary($pkexperience: Int!, $pkitinerary: Int!) {
    addExperienceToItinerary(
      pkexperience: $pkexperience
      pkitinerary: $pkitinerary
    ) {
      pkitinerary_experience
    }
  }
`;

export const SAVE_ITINERARY = gql`
  mutation saveItinerary($saving_user: Int!, $saving_itinerary: Int!) {
    saveItinerary(
      saving_user: $saving_user
      saving_itinerary: $saving_itinerary
    )
  }
`;

export const UNSAVE_ITINERARY = gql`
  mutation unsaveItinerary($pksaved_itinerary: Int!) {
    unsaveItinerary(pksaved_itinerary: $pksaved_itinerary)
  }
`;

export const ADD_USER_TO_ITINERARY = gql`
  mutation addUserToItinerary($adding_user: Int!, $adding_itinerary: Int!) {
    addUserToItinerary(
      adding_user: $adding_user
      adding_itinerary: $adding_itinerary
    )
  }
`;

export const DELETE_USER_FROM_ITINERARY = gql`
  mutation deleteUserFromItinerary($pkuser_itinerary: Int!) {
    deleteUserFromItinerary(pkuser_itinerary: $pkuser_itinerary)
  }
`;

export const DELETE_ITINERARY = gql`
  mutation deleteItinerary($pkitinerary: Int!) {
    deleteItinerary(pkitinerary: $pkitinerary)
  }
`;

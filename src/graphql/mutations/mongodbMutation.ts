import { gql } from '@apollo/client';

export const CREATE_MONGODB_TRIP = gql`
  mutation createTrip($beginning: String, $end: String) {
    createTrip(beginning: $beginning, end: $end)
  }
`;

export const INSERT_ELEMENT_INTO_TRIP = gql`
  mutation insertElementToTrip($id: String, $date: String, $element: Json) {
    insertElementToTrip(id: $id, date: $date, element: $element)
  }
`;

export const SWAP_ELEMENTS_IN_TRIP = gql`
  mutation swapElementsInTrip(
    $id: String
    $date: String
    $firstIndex: Int
    $secondIndex: Int
  ) {
    swapElementsInTrip(
      id: $id
      date: $date
      firstIndex: $firstIndex
      secondIndex: $secondIndex
    )
  }
`;

export const UPDATE_TRIP_DATE = gql`
  mutation updateTripDate($id: String, $beginning: String, $end: String) {
    updateTripDate(id: $id, beginning: $beginning, end: $end)
  }
`;

export const DELETE_ELEMENT_FROM_TRIP = gql`
  mutation deleteElementFromTrip($id: String, $date: String, $index: Int) {
    deleteElementFromTrip(id: $id, date: $date, index: $index)
  }
`;

export const INSERT_ELEMENT_INTO_NOTES = gql`
  mutation insertElementToNotes($id: String, $element: Json) {
    insertElementToNotes(id: $id, element: $element)
  }
`;

export const SWAP_ELEMENTS_IN_NOTES = gql`
  mutation swapElementsInNotes(
    $id: String
    $firstIndex: Int
    $secondIndex: Int
  ) {
    swapElementsInNotes(
      id: $id
      firstIndex: $firstIndex
      secondIndex: $secondIndex
    )
  }
`;

export const INSERT_NOTE_ELEMENT_INTO_TRIP = gql`
  mutation insertNoteElementIntoTrip(
    $id: String
    $noteIndex: Int
    $tripIndex: Int
    $date: String
  ) {
    insertNoteElementIntoTrip(
      id: $id
      noteIndex: $noteIndex
      tripIndex: $tripIndex
      date: $date
    )
  }
`;

export const INSERT_TRIP_ELEMENT_INTO_NOTES = gql`
  mutation insertTripElementIntoNotes(
    $id: String
    $noteIndex: Int
    $tripIndex: Int
    $date: String
  ) {
    insertTripElementIntoNotes(
      id: $id
      noteIndex: $noteIndex
      tripIndex: $tripIndex
      date: $date
    )
  }
`;

export const DELETE_ELEMENT_FROM_NOTES = gql`
  mutation deleteElementFromNotes($id: String, $index: Int) {
    deleteElementFromNotes(id: $id, index: $index)
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($id: String) {
    deleteTrip(id: $id)
  }
`;

export const CREATE_MONGODB_BLOG = gql`
  mutation createBlog {
    createBlog
  }
`;

export const INSERT_ELEMENT_INTO_BLOG = gql`
  mutation insertElementToBlog($id: String, $element: Json) {
    insertElementToBlog(id: $id, element: $element)
  }
`;

export const SWAP_ELEMENTS_IN_BLOG = gql`
  mutation swapElementsInBlog(
    $id: String
    $firstIndex: Int
    $secondIndex: Int
  ) {
    swapElementsInBlog(
      id: $id
      firstIndex: $firstIndex
      secondIndex: $secondIndex
    )
  }
`;

export const DELETE_ELEMENT_FROM_BLOG = gql`
  mutation deleteElementFromBlog($id: String, $index: Int) {
    deleteElementFromBlog(id: $id, index: $index)
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($id: String) {
    deleteBlog(id: $id)
  }
`;

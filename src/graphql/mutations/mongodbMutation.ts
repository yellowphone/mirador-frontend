import { gql } from '@apollo/client';

export const CREATE_MONGODB_ITINERARY = gql`
    mutation createItinerary($beginning: String, $end: String) {
        createItinerary(beginning: $beginning, end: $end)
    }
`;

export const INSERT_ELEMENT_INTO_ITINERARY = gql`
    mutation insertElementToItinerary($id: String, $date: String, $element: Json) {
        insertElementToItinerary(id: $id, date: $date, element: $element)
    }
`;

export const DELETE_ELEMENT_FROM_ITINERARY = gql`
    mutation deleteElementFromItinerary($id: String, $date: String, $index: Int) {
        deleteElementFromItinerary(id: $id, date: $date, index: $index)
    }
`;

export const DELETE_ITINERARY = gql`
    mutation deleteItinerary($id: String) {
        deleteItinerary(id: $id)
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
import { gql } from '@apollo/client';

export const CREATE_ADVENTURE = gql`
    mutation createAdventure($title: String, $pkuser: Int!, $summary: String, $miles: Float, $elevation: Int, $climbing: String, $difficulty: Difficulty_Level, $lat: Float!, $lng: Float!, $images: [Upload!], $caption: String) {
        createAdventure(title: $title, pkuser: $pkuser, summary: $summary, miles: $miles, elevation: $elevation, climbing: $climbing, difficulty: $difficulty, lat: $lat, lng: $lng, images: $images, caption: $caption)
    }
`;

export const ADD_IMG_TO_ADVENTURE = gql`
    mutation addImageToAdventure($images: [Upload!]!, $pkadventure: Int!, $caption: String, $pkuser: Int!) {
        addImageToAdventure(images: $images, pkadventure: $pkadventure, caption: $caption, pkuser: $pkuser): String
    }
`;

export const SAVE_ADVENTURE = gql`
mutation saveAdventure($saving_user: Int!, $saving_adventure: Int!) {
    saveAdventure(saving_user: $saving_user, saving_adventure: $saving_adventure)
}
`;

export const UNSAVE_ADVENTURE = gql`
mutation unsaveAdventure($pksaved_adventure: Int!) {
    unsaveAdventure(pksaved_adventure: $pksaved_adventure)
}
`;

export const VISIT_ADVENTURE = gql`
mutation visitAdventure($visiting_user: Int!, $visiting_adventure: Int!) {
    visitAdventure(visiting_user: $visiting_user, visiting_adventure: $visiting_adventure)
}
`;

export const UNVISIT_ADVENTURE = gql`
mutation unvisitAdventure($pkvisited_adventure: Int!) {
    unvisitAdventure(pkvisited_adventure: $pkvisited_adventure)
}
`;

export const REVIEW_ADVENTURE = gql`
mutation reviewAdventure($rating: Int!, $content: String, $review_user: Int!, $review_adventure: Int!, $images: [Upload!]) {
    reviewAdventure(rating: $rating, content: $content, review_user: $review_user, review_adventure: $review_adventure, images: $images)
}
`;

export const DELETE_REVIEW_ADVENTURE = gql`
mutation deleteReviewAdventure($pkreview_adventure: Int!) {
    deleteReviewAdventure(pkreview_adventure: $pkreview_adventure)
}
`;

export const DELETE_ADVENTURE = gql`
mutation deleteAdventure($pkadventure: Int!) {
    deleteAdventure(pkadventure: $pkadventure)
}
`;
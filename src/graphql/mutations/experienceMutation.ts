import { gql } from '@apollo/client';

export const CREATE_EXPERIENCE = gql`
    mutation createExperience($title: String, $pkuser: Int!, $summary: String, $miles: Float, $elevation: Int, $climbing: String, $difficulty: Difficulty_Level, $lat: Float!, $lng: Float!, $images: [Upload!], $caption: String, $tags: [Int]) {
        createExperience(title: $title, pkuser: $pkuser, summary: $summary, miles: $miles, elevation: $elevation, climbing: $climbing, difficulty: $difficulty, lat: $lat, lng: $lng, images: $images, caption: $caption, tags: $tags) {
            pkexperience
        }
    }
`;

export const ADD_IMG_TO_EXPERIENCE = gql`
    mutation addImageToExperience($images: [Upload!]!, $pkexperience: Int!, $caption: String, $pkuser: Int!) {
        addImageToExperience(images: $images, pkexperience: $pkexperience, caption: $caption, pkuser: $pkuser)
    }
`;

export const SAVE_EXPERIENCE = gql`
mutation saveExperience($saving_user: Int!, $saving_experience: Int!) {
    saveExperience(saving_user: $saving_user, saving_experience: $saving_experience)
}
`;

export const UNSAVE_EXPERIENCE = gql`
mutation unsaveExperience($pksaved_experience: Int!) {
    unsaveExperience(pksaved_experience: $pksaved_experience)
}
`;

export const VISIT_EXPERIENCE = gql`
mutation visitExperience($visiting_user: Int!, $visiting_experience: Int!) {
    visitExperience(visiting_user: $visiting_user, visiting_experience: $visiting_experience)
}
`;

export const UNVISIT_EXPERIENCE = gql`
mutation unvisitExperience($pkvisited_experience: Int!) {
    unvisitExperience(pkvisited_experience: $pkvisited_experience)
}
`;

export const REVIEW_EXPERIENCE = gql`
mutation reviewExperience($rating: Int!, $content: String, $review_user: Int!, $review_experience: Int!, $images: [Upload!]) {
    reviewExperience(rating: $rating, content: $content, review_user: $review_user, review_experience: $review_experience, images: $images)
}
`;

export const DELETE_REVIEW_EXPERIENCE = gql`
mutation deleteReviewExperience($pkreview_experience: Int!) {
    deleteReviewExperience(pkreview_experience: $pkreview_experience)
}
`;

export const DELETE_EXPERIENCE = gql`
mutation deleteExperience($pkexperience: Int!) {
    deleteExperience(pkexperience: $pkexperience)
}
`;
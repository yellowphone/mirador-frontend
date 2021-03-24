import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($email: String!, $firstname: String!, $lastname: String!, $access_token: String!, $user_id: String!, $image_url: String!) {
        createUser(email: $email, firstname: $firstname, lastname: $lastname, access_token: $access_token, user_id: $user_id, image_url: $image_url) {
            pkuser
            email
            firstname
            lastname
            username
            image_url
            access_token
            account_type
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation followUser($user_following: Int!, $user_followed: Int!) {
        followUser(user_following: $user_following, user_followed: $user_followed)
    }
`;

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($pkfollower: Int!) {
        unfollowUser(pkfollower: $pkfollower)
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($pkuser: Int!) {
        deleteUser(pkuser: $pkuser)
    }
`;
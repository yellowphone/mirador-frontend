import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!, $firstname: String!, $lastname: String!) {
        createUser(email: $email, username: $username, password: $password, firstname: $firstname, lastname: $lastname)
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
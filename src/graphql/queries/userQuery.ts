import { gql } from '@apollo/client';

export const FIND_USER = gql`
    query findUser($pkuser: Int!) {
        findUser(pkuser: $pkuser) {
            pkuser
            username
            email
            password
            firstname
            lastname
            bio
            adventures {
                pkadventure
            }
            blogs {
                pkblog
            }
        }
    }
`;

export const FIND_MANY_USERS = gql`
    query findManyUsers($firstName: String!) {
        findManyUsers(firstName: $firstName) {
            pkuser
            username
            email
            password
            firstname
            lastname
            bio
            adventures {
                pkadventure
            }
            blogs {
                pkblog
            }
        }
    }
`;
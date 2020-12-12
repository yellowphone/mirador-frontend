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
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
      experiences {
        pkexperience
      }
      blogs {
        pkblog
      }
    }
  }
`;

export const FIND_USER_BY_EMAIL = gql`
  query findUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      pkuser
      email
      firstname
      lastname
      access_token
      user_id
      image_url
      account_type
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
      experiences {
        pkexperience
      }
      blogs {
        pkblog
      }
    }
  }
`;

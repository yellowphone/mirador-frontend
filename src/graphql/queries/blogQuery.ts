import { gql } from '@apollo/client';

export const FIND_BLOG_BY_ID = gql`
    query findBlogById($pkblog: Int!) {
        findBlogById(pkblog: $pkblog) {
            pkblog
            title
            summary
            content
            created_on
            comment_blogs {
                comment
                users {
                    username
                }
            }
        }
    }
`;
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
            blog_locations {
                lat
                lng
            }
            blog_tags {
                pkblog_tag
                tags {
                  tag
                }
            }
        }
    }
`;

export const FIND_MANY_BLOGS = gql`
    query findManyBlogs {
        findManyBlogs {
            pkblog
            title
            summary
            blog_tags {
                pkblog_tag
                tags {
                  tag
                }
            }
        }
    }
`;

export const FIND_RANDOM_BLOG = gql`
    query {
        findRandomBlog(previousPrimaryKey:1)
    }
`;
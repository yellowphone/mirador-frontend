import { gql } from '@apollo/client';

export const CREATE_BLOG = gql`
  mutation createBlog(
    $title: String
    $pkuser: Int!
    $summary: String
    $mongoid: String
    $lat: Float!
    $lng: Float!
    $tags: [Int]
  ) {
    createBlog(
      title: $title
      pkuser: $pkuser
      summary: $summary
      mongoid: $mongoid
      lat: $lat
      lng: $lng
      tags: $tags
    ) {
      pkblog
      public_identifier
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog(
    $public_identifier: String
    $title: String
    $summary: String
  ) {
    updateBlog(
      public_identifier: $public_identifier
      title: $title
      summary: $summary
    ) {
      public_identifier
    }
  }
`;

export const SAVE_BLOG = gql`
  mutation saveBlog($saving_user: Int!, $saving_blog: Int!) {
    saveBlog(saving_user: $saving_user, saving_blog: $saving_blog)
  }
`;

export const UNSAVE_BLOG = gql`
  mutation unsaveBlog($pksaved_blog: Int!) {
    unsaveBlog(pksaved_blog: $pksaved_blog)
  }
`;

export const LIKE_BLOG = gql`
  mutation likeBlog($liking_user: Int!, $liking_blog: Int!) {
    likeBlog(liking_user: $liking_user, liking_blog: $liking_blog)
  }
`;

export const UNLIKE_BLOG = gql`
  mutation unlikeBlog($pkliked_blog: Int!) {
    unlikeBlog(pkliked_blog: $pkliked_blog)
  }
`;

export const COMMENT_BLOG = gql`
  mutation commentBlog($comment: String!, $pkuser: Int!, $pkblog: Int!) {
    commentBlog(comment: $comment, pkuser: $pkuser, pkblog: $pkblog)
  }
`;

export const DELETE_COMMENT_BLOG = gql`
  mutation deleteCommentBlog($pkcomment_blog: Int!) {
    deleteCommentBlog(pkcomment_blog: $pkcomment_blog)
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($pkblog: Int!) {
    deleteBlog(pkblog: $pkblog)
  }
`;

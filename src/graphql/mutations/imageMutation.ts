import { gql } from '@apollo/client';

export const CREATE_IMAGE = gql`
    mutation createImage($file: Upload!, $pkuser: Int!, $caption: String) {
        createImage(file: $file, pkuser: $pkuser, caption: $caption) {
            pkimage
            url
            caption
        }
    }
`;
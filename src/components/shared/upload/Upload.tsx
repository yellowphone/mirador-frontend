import React, { FC, FormEvent, useState } from "react"
import { useMutation } from '@apollo/react-hooks';
import { CREATE_IMAGE } from '../../../graphql/mutations/imageMutation';
import { Input, Spinner } from "@chakra-ui/react";
import { useCookies } from 'react-cookie';

interface UploadDataProps {
    addContent: Function
}

export const Upload: FC<UploadDataProps> = ({ addContent }) => {

    const [cookie, setCookie] = useCookies(['user'])

    const [ uploadPhoto, { data }] = useMutation(CREATE_IMAGE);

    const [spin, setSpin] = useState(false);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setSpin(true);

        // Getting file from input
        const file = e.target.files[0]
        console.log(file)
        if (!file) {
            console.error("Error with image")
            setSpin(false);
        }

        // Passing image to backend for AWS upload and adding to DB
        uploadPhoto({
            variables: {
                file: file,
                pkuser: cookie["user"]["pkuser"], 
                caption: ""
            }
        }).then(data => {
            // Grab img url and then Add to HTML and JSON Object after upload
            addContent("image", data.data["createImage"]["url"])
            setSpin(false);
        })
    }


    return (
        <>
            <Input type="file" required onChange={onChange}/>
            { spin && <Spinner />}
        </>
    )
}
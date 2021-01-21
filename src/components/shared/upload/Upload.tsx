import React, { FC } from "react"
import { useMutation } from '@apollo/react-hooks';
import { CREATE_IMAGE } from '../../../graphql/mutations/imageMutation';
import { Input } from "@chakra-ui/react";

interface UploadDataProps {
    addContent: Function
}

export const Upload: FC<UploadDataProps> = ({ addContent }) => {

    const [ uploadPhoto, { data }] = useMutation(CREATE_IMAGE);

    const onChange = (e) => { 
        const file = e.target.files[0]
        console.log(file)
        if (!file) console.error("Error with image")
        uploadPhoto({
            variables: {
                file: file,
                pkuser: 1, 
                caption: ""
            }
        }).then(data => {
            addContent("image", data.data["createImage"]["url"])
        })
    }


    return (
        <>
            <Input type="file" required onChange={onChange}/>
        </>
    )
}
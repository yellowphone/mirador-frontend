import React, { FC, FormEvent, useState } from "react"
import { useMutation } from '@apollo/react-hooks';
import { CREATE_IMAGE } from '../../../graphql/mutations/imageMutation';
import { Input, Spinner } from "@chakra-ui/react";

interface UploadDataProps {
    addContent: Function
}

export const Upload: FC<UploadDataProps> = ({ addContent }) => {

    const [ uploadPhoto, { data }] = useMutation(CREATE_IMAGE);

    const [spin, setSpin] = useState(false);

    const onChange = (e) => {
        setSpin(true);
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
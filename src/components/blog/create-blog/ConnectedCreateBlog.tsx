import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';

export const ConnectedCreateBlog = () => {

    const [ createBlog, { data }] = useMutation(CREATE_BLOG);

    const [ jsonContent, setJsonContent ] = useState([]);

    const history = useHistory();

    const onSubmit = (input: any) => {
        console.log(input)
        // var jsonObj = {
        //     content: jsonContent
        // }
        createBlog({
            variables: {
                title: input["title"],
                summary: input["summary"],
                content: {
                    content: jsonContent
                },
                pkuser: 1
            }
        }).then(data => {
            console.log(data)
            history.push(Paths.SingleBlog, { pkblog: data.data["createBlog"]["pkblog"] })
        })
    }

    return (
        <>
            <CreateBlog onSubmit={onSubmit} jsonContent={jsonContent} setJsonContent={setJsonContent}/>
        </>
    )

}
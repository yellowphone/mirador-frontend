import React from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';

export const ConnectedCreateBlog = () => {

    const [ createBlog, { data }] = useMutation(CREATE_BLOG);

    const history = useHistory();

    const onSubmit = (input: any) => {
        console.log(input)
        createBlog({
            variables: {
                title: input["title"],
                summary: input["summary"],
                content: input["content"],
                pkuser: 1
            }
        }).then(data => {
            history.push(Paths.SingleBlog, { pkblog: data.data["createBlog"]["pkblog"] })
        })
    }

    return (
        <>
            <CreateBlog onSubmit={onSubmit}/>
        </>
    )

}
import React, { useCallback, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useForm } from "react-hook-form";

import { Input, Box } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CREATE_ADVENTURE } from '../../../graphql/mutations/adventureMutation';

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';

export const CreateAdventure = () => {

    const { register, handleSubmit, errors } = useForm();

    const [ createAdventure, { data }] = useMutation(CREATE_ADVENTURE);

    const history = useHistory();

    const onSubmit = (input: any) => {   

        createAdventure({
            variables: {
                title: input["title"],
                pkuser: 1,
                lat: 12.123,
                lng: -123.123
            }
        }).then(data => {
            // setPkadventure(data.data["createAdventure"]["pkadventure"])
            history.push(Paths.SingleAdventure, { pkadventure: data.data["createAdventure"]["pkadventure"] });
        })

        // if (pkadventure != 0) {
        //     const history = useHistory();
        //     history.push(Paths.SingleAdventure, { pkadventure: pkadventure });
        // }
        
    };

    // // works but also gives an error
    // console.log(pkadventure)

    // if (pkadventure != 0) {
    //     const history = useHistory();
    //     history.push(Paths.SingleAdventure, { pkadventure: pkadventure });
    // }

    return (
        <>
            <NavigationBar/>
            <Box maxW='100%'>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Input name="title" placeholder="Title" ref={register} />
                    <Button type="submit">Create</Button>
                </form>
            </Box> 
        </>
    )
}

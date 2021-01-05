import React, { useCallback, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useForm } from "react-hook-form";

import { Input, Box } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CREATE_ADVENTURE } from '../../../graphql/mutations/adventureMutation';

import { Search } from '../../shared/Google/Search'

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';

import { Loader } from '@googlemaps/js-api-loader';


export const CreateAdventure = () => {

    const { register, handleSubmit, errors } = useForm();

    const [createCoords, setCreateCoords] = useState({lat: 0, lng: 0});

    const [ createAdventure, { data }] = useMutation(CREATE_ADVENTURE);

    const history = useHistory();

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const onSubmit = (input: any) => {   
        createAdventure({
            variables: {
                title: input["title"],
                pkuser: 1,
                lat: createCoords["lat"], 
                lng: createCoords["lng"]
            }
        }).then(data => {
            history.push(Paths.SingleAdventure, { pkadventure: data.data["createAdventure"]["pkadventure"] });
        })
    };

    return (
        <>
            <NavigationBar/>
            <Box maxW='100%'>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Input name="title" placeholder="Title" ref={register} />
                    <Search loader={loader} setCoords={setCreateCoords} refetch={() => {}} />
                    <Button type="submit">Create</Button>
                </form>
            </Box> 
        </>
    )
}

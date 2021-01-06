import React, { useCallback, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useForm } from "react-hook-form";

import { Input, 
        Box,
        NumberInput,
        NumberInputField,
        NumberInputStepper,
        NumberIncrementStepper,
        NumberDecrementStepper, 
        Select,
        Textarea 
    } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CREATE_ADVENTURE } from '../../../graphql/mutations/adventureMutation';

import { Search } from '../../shared/Google/Search'

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';

import { Loader } from '@googlemaps/js-api-loader';
import { DifficultyType } from "../../shared/media/Badges/Badges.types";


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
        console.log(input)
        createAdventure({
            variables: {
                title: input["title"],
                summary: input["summary"],
                miles: parseFloat(input["miles"]),
                elevation: parseInt(input["elevation"]),
                difficulty: input["difficulty"],
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
                    <Textarea name="summary" placeholder="Summary" ref={register} />

                    {/* <Input name="miles" placeholder="Summary" ref={register} /> */}
                    <NumberInput name="miles" defaultValue={5} precision={1} step={0.1} ref={register}>
                    <NumberInputField name="miles" ref={register}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    {/* <Input name="elevation" placeholder="Title" ref={register} /> */}
                    <NumberInput name="elevation" defaultValue={500} ref={register}>
                    <NumberInputField name="elevation" ref={register}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    {/* <Input name="difficulty" placeholder="Title" ref={register} /> */}
                    <Select name="difficulty" placeholder="Select difficulty" ref={register}>
                        <option value={DifficultyType.EASY}>Easy</option>
                        <option value={DifficultyType.MODERATE}>Moderate</option>
                        <option value={DifficultyType.HARD}>Hard</option>
                    </Select>

                    <Search loader={loader} setCoords={setCreateCoords} refetch={() => {}} />
                    <Button type="submit">Create</Button>
                </form>
            </Box> 
        </>
    )
}

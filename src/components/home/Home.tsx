import React, { useEffect } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Input, VStack, Center, Box, Button, } from '@chakra-ui/react';
import './Home.css';

import { Search } from '../shared/Google/Search'
import { useMutation } from '@apollo/client';
import { CREATE_MONGODB_ITINERARY } from '../../graphql/mutations/mongodbMutation';
import { mongodbClient } from "../../graphql/mongodbClient"
import { useForm } from 'react-hook-form';

export const Home = () => {

    // const [createItinerary, { data }] = useMutation(CREATE_MONGODB_ITINERARY, {
    //     client: mongodbClient
    // });

    // const { register, handleSubmit, errors } = useForm();

    // const onSubmit = () => {
    //     createItinerary().then(data => {
    //         console.log(data)
    //     })
    // }
    
    return (
        <>
            <NavigationBar />
            <VStack>
                <Box className='exploreBar' width='50%'>
                    <Center>Let's Explore</Center>
                    <Input placeholder={'Type a location to get started'} />
                    {/* <SearchWithMap /> */}
                </Box>
                {/* <form onSubmit = { handleSubmit(onSubmit)}>
                    <Button type="submit">Create</Button>
                </form> */}
            </VStack>
        </>
    )
}
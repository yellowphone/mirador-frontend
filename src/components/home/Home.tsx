import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Input, VStack, Center, Box, } from '@chakra-ui/react';
import './Home.css';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const Home = () => {

    return (
        <>
            <NavigationBar />
            <VStack>
                <Box width='50%'>
                    <Center>Let's Explore</Center>
                    {/* <Input placeholder={'Type a location to get started'} /> */}

                    {/* For now, this package can chill, but we can look for better options soon */}
                    <GooglePlacesAutocomplete
                        apiKey={process.env.MAPS_API_KEY}
                        selectProps= {{
                            placeholder: 'Type a location to get started',
                        }}
                    />
                </Box>
            </VStack>
        </>
    )
}
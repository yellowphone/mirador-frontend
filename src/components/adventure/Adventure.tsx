import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Map } from '../shared/Map/Map';

const center = {
    lat: 37.223454,
    lng: -80.424
}

export const Adventure = () => {

    return (
        <>
            <NavigationBar />
             <Flex>
                <Box>
                    <Center>Adventure</Center>
                </Box>
                <Box>
                    <Map width={screen.width / 2} height={screen.height - 170} />
                </Box>
            </Flex> 
        </>
    )
}
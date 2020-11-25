import { Box, Center, HStack } from '@chakra-ui/react';
import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Map } from '../shared/Map/Map';

export const Adventure = () => {

    return (
        <>
            <NavigationBar />
            <HStack>
                {/* <Box>
                    <Center>Adventure</Center>
                </Box>
                <Box> */}
                    <Map width={screen.width / 2} height={screen.height - 150} />
                {/* </Box> */}
            </HStack>
        </>
    )
}
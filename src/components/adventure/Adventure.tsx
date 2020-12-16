import { Box, Center, Flex, Input } from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Map } from '../shared/Google/Map';
import './Adventure.css';
import { AdventureDataProps } from './Adventure.types';
import { CardsGrid } from '../shared/cards-grid/CardsGrid';

const leftSideStyle = {
    scroll: 'auto',
}

const rightSideStyle = {
    scroll: 'none',
    // position: 'fixed', // need to get the map to be fixed to the right
}

export const Adventure: FC<AdventureDataProps> = ({ adventures }) => {
    return (
        <>
            <NavigationBar />
             <Flex>
                <Box css={leftSideStyle} maxW='50%' width={screen.width / 2}>
                    <Center 
                        pt='5'
                    >
                        <Input
                            width='40%'
                            placeholder={'Where do you want to go?'}
                        />
                    </Center>

                    <CardsGrid list={adventures} />
                </Box>
                <Box css={rightSideStyle} maxW='50%' width={screen.width / 2}>
                    <Map width={screen.width / 2} height={screen.height - 170} />
                </Box>
            </Flex> 
        </>
    )
}

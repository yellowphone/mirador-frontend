import { Box, Center, Flex, Input } from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Map } from '../shared/Map/Map';
import './Experience.css';
import { ExperienceDataProps } from './Experience.types';
import { CardsGrid } from '../shared/cards-grid/CardsGrid';

const leftSideStyle = {
    scroll: 'auto',
}

const rightSideStyle = {
    scroll: 'none',
    // position: 'fixed', // need to get the map to be fixed to the right
}

export const Experience: FC<ExperienceDataProps> = ({ experiences }) => {
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

                    <CardsGrid list={experiences} />
                </Box>
                <Box css={rightSideStyle} maxW='50%' width={screen.width / 2}>
                    <Map width={screen.width / 2} height={screen.height - 170} />
                </Box>
            </Flex> 
        </>
    )
}

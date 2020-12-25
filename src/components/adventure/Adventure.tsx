import { Box, Center, Flex, Input } from '@chakra-ui/react';
import React, { FC, useEffect, useState, useRef } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import './Adventure.css';
import { AdventureDataProps } from './Adventure.types';
import { CardsGrid } from '../shared/cards-grid/CardsGrid';

import { Search } from '../shared/Google/Search'
import { Map } from '../shared/Google/Map';
import { Loader } from '@googlemaps/js-api-loader';

const leftSideStyle = {
    scroll: 'auto',
}

const rightSideStyle = {
    scroll: 'none',
    // position: 'fixed', // need to get the map to be fixed to the right
}

export const Adventure: FC<AdventureDataProps> = ({ adventures }) => {

    const [coords, setCoords] = useState([44.349483, -68.187912]);

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    return (
        <>
            <NavigationBar />
             <Flex>
                <Box css={leftSideStyle} maxW='50%' width={screen.width / 2}>
                    <Center 
                        pt='5'
                    >
                        <Search setCoords={setCoords} />
                    </Center>

                    <CardsGrid list={adventures} />
                </Box>
                <Box css={rightSideStyle} maxW='50%' width={screen.width / 2}>
                    <Map width={screen.width / 2} height={screen.height - 170} loader={loader} coords={coords} adventures={adventures}/>
                </Box>
            </Flex> 
        </>
    )
}

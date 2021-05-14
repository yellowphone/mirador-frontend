import { Box, Center, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import './Experience.css';
import { ExperienceDataProps } from './Experience.types';
import { CardsGrid } from '../shared/cards-grid/CardsGrid';

import { Search } from '../shared/Google/Search';
import { Map } from '../shared/Google/Map';
import { Loader } from '@googlemaps/js-api-loader';

const leftSideStyle = {
  scroll: 'auto',
};

const rightSideStyle = {
  scroll: 'none',
  // position: 'fixed', // need to get the map to be fixed to the right
};

export const Experience: FC<ExperienceDataProps> = ({
  experiences,
  coords,
  setCoords,
  refetch,
}) => {
  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  return (
    <>
      <NavigationBar />
      <Flex>
        <Box css={leftSideStyle} maxW="50%" width={screen.width / 2}>
          <Center pt="5">
            <Search loader={loader} setCoords={setCoords} refetch={refetch} />
          </Center>

          <CardsGrid list={experiences} />
        </Box>
        <Box css={rightSideStyle} maxW="50%" width={screen.width / 2}>
          <Map loader={loader} coords={coords} experiences={experiences} />
        </Box>
      </Flex>
    </>
  );
};

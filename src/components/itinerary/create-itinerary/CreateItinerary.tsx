import { Box, Flex } from '@chakra-ui/react';
import React, { useState, FC } from 'react';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { CreateItineraryDataProps } from './CreateItinerary.types';
import { ItineraryBuilder } from './ItineraryBuilder';
import { ItinerarySearcher } from './ItinerarySearcher';

const leftSideStyle = {
  scroll: 'none',
};

const rightSideStyle = {
  scroll: 'none',
  // position: 'fixed', // need to get the map to be fixed to the right
};

/**
 * This component is to create an itinerary entirely from scratch
 */
export const CreateItinerary: FC<CreateItineraryDataProps> = ({ history }) => {
  const [title] = useState('New Itinerary');

  return (
    <>
      <NavigationBar />
      <Flex>
        {/* <Box maxW='100%' width={screen.width} w="100%">
                    <Heading>{title}</Heading>
                </Box> */}

        <Box css={leftSideStyle} maxW="50%" width={0.5 * screen.width}>
          <ItinerarySearcher />
        </Box>
        <Box css={rightSideStyle} maxW="50%" width={0.5 * screen.width}>
          <ItineraryBuilder title={title} history={history} />
        </Box>
      </Flex>
    </>
  );
};

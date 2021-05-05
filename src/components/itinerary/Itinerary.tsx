import { Heading } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { TSFixMe } from '../../types/global';
import { ItineraryGrid } from '../shared/itinerary-grid/ItineraryGrid';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';

export const Itinerary: FC<TSFixMe> = ({ itineraries }): React.ReactElement => {
  return (
    <>
      <NavigationBar />
      <Heading m={2}>Your itineraries</Heading>
      <ItineraryGrid itineraries={itineraries} />
    </>
  );
};

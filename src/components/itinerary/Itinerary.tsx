import { Heading } from '@chakra-ui/layout';
import React from 'react';
import { ItineraryGrid } from '../shared/itinerary-grid/ItineraryGrid';
import { FindItineraryByIdObject } from './single-itinerary/SingleItinerary.types';

export const Itinerary = ({
  itineraries,
}: {
  itineraries: FindItineraryByIdObject[];
}): React.ReactElement => {
  return (
    <>
      <Heading m={2}>Your itineraries</Heading>
      <ItineraryGrid itineraries={itineraries} />
    </>
  );
};

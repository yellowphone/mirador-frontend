import { Container, SimpleGrid } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { FindItineraryByIdObject } from '../../itinerary/single-itinerary/SingleItinerary.types';
import { ItineraryCard } from '../itinerary-card/ItineraryCard';

export const ItineraryGrid = ({
  itineraries,
}: {
  itineraries: FindItineraryByIdObject[];
}) => {
  console.log(itineraries);
  return (
    <Container maxW="xl" centerContent>
      <SimpleGrid columns={3} spacing={10}>
        {itineraries &&
          itineraries.map((item: FindItineraryByIdObject, index: number) => {
            return <ItineraryCard itinerary={item} key={index} />;
          })}
      </SimpleGrid>
    </Container>
  );
};

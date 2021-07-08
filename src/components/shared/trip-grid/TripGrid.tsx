import { Container, SimpleGrid } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { FindTripByIdObject } from '../../trip/single-trip/SingleTrip.types';
import { TripCard } from '../trip-card/TripCard';

export const TripGrid = ({ trips }: { trips: FindTripByIdObject[] }) => {
  return (
    <Container maxW="xl" centerContent>
      <SimpleGrid columns={3} spacing={10}>
        {trips &&
          trips.map((item: FindTripByIdObject, index: number) => {
            return <TripCard trip={item} key={index} />;
          })}
      </SimpleGrid>
    </Container>
  );
};

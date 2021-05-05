import { Container, SimpleGrid } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { TSFixMe } from '../../../types/global';
import { ItineraryCard } from '../itinerary-card/ItineraryCard';

export const ItineraryGrid: FC<TSFixMe> = ({ itineraries }) => {
  console.log(itineraries);
  return (
    <Container maxW="xl" centerContent>
      <SimpleGrid columns={3} spacing={10}>
        {itineraries &&
          itineraries.map((item: TSFixMe, index: number) => {
            return <ItineraryCard itinerary={item} key={index} />;
          })}
      </SimpleGrid>
    </Container>
  );
};

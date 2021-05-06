import { Box, Heading } from '@chakra-ui/layout';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Paths } from '../../../utils/paths';
import { FindItineraryByIdObject } from '../../itinerary/single-itinerary/SingleItinerary.types';

export const ItineraryCard = ({
  itinerary,
}: {
  itinerary: FindItineraryByIdObject;
}) => {
  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(`${path}/${itinerary.public_identifier}`);
    },
    [history, itinerary.public_identifier]
  );

  return (
    <Box
      onClick={() => onNavigate(Paths.SingleItinerary)}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading p={2} size="md">
        {itinerary.title}
      </Heading>
    </Box>
  );
};

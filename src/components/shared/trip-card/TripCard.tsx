import { Box, Heading } from '@chakra-ui/layout';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Paths } from '../../../utils/paths';
import { FindTripByIdObject } from '../../trip/single-trip/SingleTrip.types';

export const TripCard = ({ trip }: { trip: FindTripByIdObject }) => {
  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(`${path}/${trip.public_identifier}`);
    },
    [history, trip.public_identifier]
  );

  return (
    <Box
      onClick={() => onNavigate(Paths.SingleTrip)}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading p={2} size="md">
        {trip.title}
      </Heading>
    </Box>
  );
};

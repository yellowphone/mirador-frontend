import { Box, Heading } from '@chakra-ui/layout';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';
import { TSFixMe } from '../../../types/global';
import { Paths } from '../../../utils/paths';

export const ItineraryCard: FC<TSFixMe> = ({ itinerary }) => {
  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(path + '/' + itinerary.public_identifier);
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

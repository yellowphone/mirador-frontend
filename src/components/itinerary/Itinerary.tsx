import { useLazyQuery, useQuery } from '@apollo/client';
import { Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  FIND_ITINERARIES_FOR_USER,
  FIND_MANY_ITINERARIES,
} from '../../graphql/queries/itineraryQuery';
import { ItineraryGrid } from '../shared/itinerary-grid/ItineraryGrid';
import { FindItineraryByIdObject } from './single-itinerary/SingleItinerary.types';

export const Itinerary = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [itineraries, setItineraries] = useState<FindItineraryByIdObject[]>([]);

  const [userItineraries, setUserItineraries] = useState<
    FindItineraryByIdObject[]
  >([]);

  const [findItineraries] = useLazyQuery(FIND_ITINERARIES_FOR_USER, {
    onCompleted: incomingData => {
      setUserItineraries(incomingData.findUser.itineraries);
    },
    fetchPolicy: 'cache-and-network',
  });

  useQuery(FIND_MANY_ITINERARIES, {
    onCompleted: incomingData => {
      setItineraries(incomingData.findManyItineraries);
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (cookie['user']) {
      findItineraries({
        variables: {
          pkuser: cookie['user']['pkuser'],
        },
      });
    }
  }, [cookie['user']]);

  return (
    <>
      <Heading m={2}>Your itineraries</Heading>
      <Text>all itineraries</Text>
      <ItineraryGrid itineraries={itineraries} />
      {cookie['user'] && (
        <>
          <Text>User itineraries</Text>
          <ItineraryGrid itineraries={userItineraries} />
        </>
      )}
    </>
  );
};

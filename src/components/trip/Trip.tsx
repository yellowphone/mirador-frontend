import { useLazyQuery, useQuery } from '@apollo/client';
import { Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  FIND_TRIPS_FOR_USER,
  FIND_MANY_TRIPS,
} from '../../graphql/queries/tripQuery';
import { TripGrid } from '../shared/trip-grid/TripGrid';
import { FindTripByIdObject } from './single-trip/SingleTrip.types';

export const Trip = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [trips, setTrips] = useState<FindTripByIdObject[]>([]);

  const [userTrips, setUserTrips] = useState<FindTripByIdObject[]>([]);

  const [findTrips] = useLazyQuery(FIND_TRIPS_FOR_USER, {
    onCompleted: incomingData => {
      setUserTrips(incomingData.findUser.trips);
    },
    fetchPolicy: 'cache-and-network',
  });

  useQuery(FIND_MANY_TRIPS, {
    onCompleted: incomingData => {
      setTrips(incomingData.findManyTrips);
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (cookie['user']) {
      findTrips({
        variables: {
          pkuser: cookie['user']['pkuser'],
        },
      });
    }
  }, [cookie['user']]);

  return (
    <>
      <Heading m={2}>Your trips</Heading>
      <Text>all trips</Text>
      <TripGrid trips={trips} />
      {cookie['user'] && (
        <>
          <Text>User trips</Text>
          <TripGrid trips={userTrips} />
        </>
      )}
    </>
  );
};

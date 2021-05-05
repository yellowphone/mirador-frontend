import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_ITINERARIES_FOR_USER } from '../../graphql/queries/itineraryQuery';
import { Itinerary } from './Itinerary';
import { FindItineraryByIdObject } from './single-itinerary/SingleItinerary.types';

export const ConnectedItinerary = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [itineraries, setItineraries] = useState<FindItineraryByIdObject[]>([]);

  useQuery(FIND_ITINERARIES_FOR_USER, {
    variables: {
      pkuser: cookie['user']['pkuser'],
    },
    onCompleted: incomingData => {
      console.log(incomingData.findUser.itineraries);
      setItineraries(incomingData.findUser.itineraries);
    },
    fetchPolicy: 'cache-and-network',
  });

  return <Itinerary itineraries={itineraries} />;
};

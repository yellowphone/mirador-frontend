import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_ITINERARIES_FOR_USER } from '../../graphql/queries/itineraryQuery';
import { Itinerary } from './Itinerary';
import { FindItineraryByIdObject } from './single-itinerary/SingleItinerary.types';

export const ConnectedItinerary = (): React.ReactElement => {
  return <Itinerary />;
};

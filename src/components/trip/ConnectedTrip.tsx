import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_TRIPS_FOR_USER } from '../../graphql/queries/tripQuery';
import { Trip } from './Trip';
import { FindTripByIdObject } from './single-trip/SingleTrip.types';

export const ConnectedTrip = (): React.ReactElement => {
  return <Trip />;
};

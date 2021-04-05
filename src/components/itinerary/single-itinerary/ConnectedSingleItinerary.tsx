import { useQuery } from '@apollo/client';
import React from 'react';
import { FIND_ITINERARY_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/itineraryQuery';
import { SingleItinerary } from './SingleItinerary';
import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';

export const ConnectedSingleItinerary = (): React.ReactElement => {
  const location = useLocation();

  const { data, loading, error } = useQuery(
    FIND_ITINERARY_BY_PUBLIC_IDENTIFIER,
    {
      variables: { public_identifier: location.pathname.split('/')[2] },
    }
  );

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  console.log(data);

  return (
    <>
      {!data.findItineraryByPublicIdentifier && <Page404 />}
      {data.findItineraryByPublicIdentifier && (
        <SingleItinerary data={data['findItineraryByPublicIdentifier']} />
      )}
    </>
  );
};

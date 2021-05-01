import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FIND_ITINERARY_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/itineraryQuery';
import { SingleItinerary } from './SingleItinerary';
import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';
import { FIND_MONGODB_ITINERARY } from '../../../graphql/queries/mongodbQuery';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { TSFixMe } from '../../../types/global';
import {
  ElementProps,
  ManyElementDataProps,
} from '../create-itinerary/CreateItinerary.types';

export const ConnectedSingleItinerary = (): React.ReactElement => {
  const location = useLocation();

  const [mongoid, setMongoid] = useState<string>('');
  const [data, setData] = useState<TSFixMe>({});
  const [elements, setElements] = useState<ManyElementDataProps>({});

  // need refetch

  useQuery(FIND_ITINERARY_BY_PUBLIC_IDENTIFIER, {
    variables: { public_identifier: location.pathname.split('/')[2] },
    onCompleted: data => {
      console.log(data);
      setData(data);
      setMongoid(data['findItineraryByPublicIdentifier']['mongoid']);
    },
    onError: error => {
      console.error(error);
    },
  });

  useQuery(FIND_MONGODB_ITINERARY, {
    variables: { id: mongoid },
    client: mongodbClient,
    onCompleted: incomingData => {
      const tempData: ManyElementDataProps = {};
      Object.keys(incomingData.findItinerary).map((key, index) => {
        if (key != '_id') {
          tempData[key] = incomingData.findItinerary[key];
        }
      });
      setElements(tempData);
    },
    onError: err => console.error(err),
  });

  return (
    <>
      {!data.findItineraryByPublicIdentifier && <Page404 />}
      {data.findItineraryByPublicIdentifier && (
        <SingleItinerary
          data={data['findItineraryByPublicIdentifier']}
          elements={elements}
        />
      )}
    </>
  );
};

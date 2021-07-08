import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FIND_TRIP_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/tripQuery';
import { SingleTrip } from './SingleTrip';
import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';
import { FIND_MONGODB_TRIP } from '../../../graphql/queries/mongodbQuery';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { TSFixMe } from '../../../types/global';
import { ManyElementDataProps } from '../create-trip/CreateTrip.types';

export const ConnectedSingleTrip = (): React.ReactElement => {
  const location = useLocation();

  const [mongoid, setMongoid] = useState<string>('');
  const [data, setData] = useState<TSFixMe>({});
  const [elements, setElements] = useState<ManyElementDataProps>({});

  useQuery(FIND_TRIP_BY_PUBLIC_IDENTIFIER, {
    variables: { public_identifier: location.pathname.split('/')[2] },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      console.log(data);
      setData(data);
      setMongoid(data['findTripByPublicIdentifier']['mongoid']);
    },
    onError: error => {
      console.error(error);
    },
  });

  useQuery(FIND_MONGODB_TRIP, {
    variables: { id: mongoid },
    client: mongodbClient,
    fetchPolicy: 'cache-and-network',
    onCompleted: incomingData => {
      const tempData: ManyElementDataProps = {};
      Object.keys(incomingData.findTrip).map(key => {
        if (key != '_id') {
          tempData[key] = incomingData.findTrip[key];
        }
      });
      setElements(tempData);
    },
    onError: err => console.error(err),
  });

  return (
    <>
      {!data.findTripByPublicIdentifier && <Page404 />}
      {data.findTripByPublicIdentifier && (
        <SingleTrip
          data={data['findTripByPublicIdentifier']}
          elements={elements}
        />
      )}
    </>
  );
};

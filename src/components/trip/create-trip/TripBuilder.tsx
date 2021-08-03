import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyTrip } from './EmptyTrip';
import { ActiveTrip } from '../ActiveTrip';
import { ManyElementDataProps } from './CreateTrip.types';
import { CREATE_MONGODB_TRIP } from '../../../graphql/mutations/mongodbMutation';
import { LOCAL_STORAGE } from '../../../utils/constants';
import { useLocationContext } from '../../../utils/context/LocationContext';
import { useCookies } from 'react-cookie';
import { CREATE_TRIP } from '../../../graphql/mutations/tripMutation';

export const TripBuilder = (): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [publicIdentifier, setPublicIdentifier] = useState('');
  const { coords, setCoords } = useLocationContext();
  const [elements, setElements] = useState<ManyElementDataProps>({});
  const [cookie] = useCookies(['user']);

  const [createMongoTrip] = useMutation(CREATE_MONGODB_TRIP, {
    client: mongodbClient,
  });

  const [createTrip] = useMutation(CREATE_TRIP);

  const createTripHelper = useCallback(
    mongoData => {
      createTrip({
        variables: {
          title: 'My trip',
          summary: '',
          mongoid: mongoData.data.createTrip._id,
          pkuser: cookie['user']['pkuser'],
        },
      }).then(sqlData => {
        console.log(sqlData.data.createTrip.public_identifier);
        setPublicIdentifier(sqlData.data.createTrip.public_identifier);
      });
    },
    [cookie, createTrip]
  );

  useEffect(() => {
    createMongoTrip().then(data => {
      createTripHelper(data);
      setMongoid(data.data.createTrip._id);
      setElements(data.data.createTrip.trip);
    });
  }, [createTrip, createTripHelper, createMongoTrip]);

  return (
    <ActiveTrip
      elements={elements}
      setElements={setElements}
      mongoId={mongoid}
      public_identifier={publicIdentifier}
    />
  );
};

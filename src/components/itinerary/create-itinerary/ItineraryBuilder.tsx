import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyItinerary } from './EmptyItinerary';
import { ActiveItinerary } from '../ActiveItinerary';
import { ManyElementDataProps } from './CreateItinerary.types';
import { CREATE_MONGODB_ITINERARY } from '../../../graphql/mutations/mongodbMutation';
import { LOCAL_STORAGE } from '../../../utils/constants';
import { useLocationContext } from '../../../utils/context/LocationContext';
import { useCookies } from 'react-cookie';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';

export const ItineraryBuilder = (): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [publicIdentifier, setPublicIdentifier] = useState('');
  const { coords, setCoords } = useLocationContext();
  const [elements, setElements] = useState<ManyElementDataProps>({});
  const [cookie] = useCookies(['user']);

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });

  const [createItinerary] = useMutation(CREATE_ITINERARY);

  const createItineraryHelper = useCallback(
    mongoData => {
      createItinerary({
        variables: {
          title: 'My trip',
          summary: '',
          mongoid: mongoData.data.createItinerary._id,
          pkuser: cookie['user']['pkuser'],
        },
      }).then(sqlData => {
        console.log(sqlData.data.createItinerary.public_identifier);
        setPublicIdentifier(sqlData.data.createItinerary.public_identifier);
      });
    },
    [cookie, createItinerary]
  );

  useEffect(() => {
    createMongoItinerary().then(data => {
      createItineraryHelper(data);
      setMongoid(data.data.createItinerary._id);
      delete data.data.createItinerary._id;
      setElements(data.data.createItinerary);
    });
  }, [createItinerary, createItineraryHelper, createMongoItinerary]);

  return (
    <ActiveItinerary
      elements={elements}
      setElements={setElements}
      mongoId={mongoid}
      public_identifier={publicIdentifier}
    />
  );
};

import React, { ReactElement, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyItinerary } from './EmptyItinerary';
import { ActiveItinerary } from '../ActiveItinerary';
import { ManyElementDataProps } from './CreateItinerary.types';
import { CREATE_MONGODB_ITINERARY } from '../../../graphql/mutations/mongodbMutation';
import { LOCAL_STORAGE } from '../../../utils/constants';

export const ItineraryBuilder = (): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });
  const activeUnsavedItinerary = localStorage.getItem(
    LOCAL_STORAGE.ITINERARY_RANGE
  );

  // Itinerary creates
  const onItineraryCreate = (input: { start: string; end: string }) => {
    const { start, end } = input;
    if (start <= end) {
      createMongoItinerary({
        variables: {
          beginning: start,
          end,
        },
      }).then(data => {
        setMongoid(data.data.createItinerary._id);
        delete data.data.createItinerary._id;
        setElements(data.data.createItinerary);
      });
    } else {
      alert('Date range is not valid! Try again!');
    }
  };

  const hasElements = Object.keys(elements).length > 0;

  useEffect(() => {
    if (activeUnsavedItinerary && !hasElements) {
      setElements(JSON.parse(activeUnsavedItinerary));
    }
  }, [activeUnsavedItinerary, hasElements]);

  useEffect(() => {
    if (Object.keys(elements).length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE.ITINERARY_RANGE,
        JSON.stringify(elements)
      );
    }
  }, [elements]);

  return hasElements || activeUnsavedItinerary ? (
    <ActiveItinerary
      elements={elements}
      setElements={setElements}
      mongoId={mongoid}
    />
  ) : (
    <EmptyItinerary onItineraryCreate={onItineraryCreate} />
  );
};

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
  const { coords, setCoords } = useLocationContext();
  const [elements, setElements] = useState<ManyElementDataProps>({});
  const [cookie] = useCookies(['user']);

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });

  const [createItinerary] = useMutation(CREATE_ITINERARY);

  const activeUnsavedItinerary = localStorage.getItem(
    LOCAL_STORAGE.ITINERARY_RANGE
  );
  const activeUnsavedCoords = localStorage.getItem(LOCAL_STORAGE.COORDS);

  // // Itinerary creates
  // const onItineraryCreate = (start: string, end: string) => {
  //   if (start <= end) {
  //     createMongoItinerary({
  //       variables: {
  //         beginning: start,
  //         end,
  //       },
  //     }).then(data => {
  //       setMongoid(data.data.createItinerary._id);
  //       delete data.data.createItinerary._id;
  //       setElements(data.data.createItinerary);
  //     });
  //   } else {
  //     alert('Date range is not valid! Try again!');
  //   }
  // };

  const hasElements = Object.keys(elements).length > 0;

  const createItineraryHelper = useCallback(
    mongoData => {
      createItinerary({
        variables: {
          title: 'My trip',
          summary: '',
          mongoid: mongoData.data.createItinerary._id,
          pkuser: cookie['user']['pkuser'],
        },
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

  /**
   *     createItinerary({
      variables: {
        title: title,
        summary: '',
        mongoid: mongoId,
        pkuser: cookie['user']['pkuser'],
      },
    }).then(data => {
      const path = `${Paths.SingleItinerary}/${data.data['createItinerary']['public_identifier']}`;
      history.push(path);
      localStorage.removeItem(LOCAL_STORAGE.ITINERARY_RANGE);
    });
   */

  useEffect(() => {
    if (activeUnsavedItinerary && activeUnsavedCoords && !hasElements) {
      setElements(JSON.parse(activeUnsavedItinerary));
      setCoords(JSON.parse(activeUnsavedCoords));
    }
  }, [
    activeUnsavedCoords,
    activeUnsavedItinerary,
    setCoords,
    coords,
    hasElements,
  ]);

  useEffect(() => {
    if (Object.keys(elements).length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE.ITINERARY_RANGE,
        JSON.stringify(elements)
      );
      localStorage.setItem(LOCAL_STORAGE.COORDS, JSON.stringify(coords));
    }
  }, [coords, elements]);

  // return hasElements || activeUnsavedItinerary ? (
  //   <ActiveItinerary
  //     elements={elements}
  //     setElements={setElements}
  //     mongoId={mongoid}
  //   />
  // ) : (
  //   <EmptyItinerary onItineraryCreate={onItineraryCreate} />
  // );

  return (
    <ActiveItinerary
      elements={elements}
      setElements={setElements}
      mongoId={mongoid}
    />
  );
};

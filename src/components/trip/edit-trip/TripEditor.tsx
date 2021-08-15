import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyTrip } from './EmptyTrip';
import {
  TripEditorProps,
  ManyElementDataProps,
  ElementProps,
} from './EditTrip.types';
import { FIND_MONGODB_TRIP } from '../../../graphql/queries/mongodbQuery';
import { ActiveEditTrip } from './ActiveEditTrip';

export const TripEditor: FC<TripEditorProps> = ({ data }): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});
  const [notes, setNotes] = useState<ElementProps[]>([]);

  const {
    data: mongoData,
    loading,
    error,
  } = useQuery(FIND_MONGODB_TRIP, {
    client: mongodbClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: data['findTripByPublicIdentifier']['mongoid'],
    },
    onError: err => console.error(err),
  });

  useEffect(() => {
    setElements(mongoData.findTrip.trip);
    setNotes(mongoData.findTrip.notes);
  }, [mongoData]);

  useEffect(() => {
    setMongoid(data.findTripByPublicIdentifier.mongoid);
  }, [data.findTripByPublicIdentifier.mongoid]);

  return (
    <>
      {!loading && error === undefined && (
        <ActiveEditTrip
          elements={elements}
          notes={notes}
          setElements={setElements}
          setNotes={setNotes}
          mongoId={mongoid}
          public_identifier={data.findTripByPublicIdentifier.public_identifier}
          title={data.findTripByPublicIdentifier.title}
        />
      )}
    </>
  );
};

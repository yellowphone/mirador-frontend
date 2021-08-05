import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyTrip } from './EmptyTrip';
import {
  TripEditorProps,
  ManyElementDataProps,
  ElementProps,
} from './EditTrip.types';
import { CREATE_MONGODB_TRIP } from '../../../graphql/mutations/mongodbMutation';
import { FIND_MONGODB_TRIP } from '../../../graphql/queries/mongodbQuery';
import { UPDATE_TRIP } from '../../../graphql/mutations/tripMutation';
import { ActiveEditTrip } from './ActiveEditTrip';

export const TripEditor: FC<TripEditorProps> = ({ data }): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});
  const [notes, setNotes] = useState<ElementProps[]>([]);

  // const [createMongoTrip] = useMutation(CREATE_MONGODB_TRIP, {
  //   client: mongodbClient,
  // });

  // const [updateTrip] = useMutation(UPDATE_TRIP);

  const { data: mongoData } = useQuery(FIND_MONGODB_TRIP, {
    client: mongodbClient,
    fetchPolicy: 'cache-and-network',
    onError: err => console.error(err),
    variables: {
      id: data.findTripByPublicIdentifier.mongoid,
    },
  });

  // const [findMongoTrip, { data: mongoData }] = useLazyQuery(FIND_MONGODB_TRIP, {
  //   client: mongodbClient,
  //   fetchPolicy: 'cache-and-network',
  //   // onCompleted: incomingData => {
  //   //   setElements(incomingData.findTrip.trip);
  //   //   setNotes(incomingData.findTrip.notes);
  //   // },
  //   onError: err => console.error(err),
  // });

  useEffect(() => {
    if (mongoData) {
      setElements(mongoData.findTrip.trip);
      setNotes(mongoData.findTrip.notes);
    }
  }, [mongoData]);

  // useEffect(() => {
  //   if (data['findTripByPublicIdentifier']['mongoid']) {
  //     setMongoid(data.findTripByPublicIdentifier.mongoid);
  //     // findMongoTrip({
  //     //   variables: {
  //     //     id: data['findTripByPublicIdentifier']['mongoid'],
  //     //   },
  //     });
  //   }
  // }, [data, findMongoTrip]);

  return (
    <ActiveEditTrip
      elements={elements}
      notes={notes}
      setElements={setElements}
      setNotes={setNotes}
      mongoId={mongoid}
      public_identifier={data.findTripByPublicIdentifier.public_identifier}
      title={data.findTripByPublicIdentifier.title}
    />
  );
};

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyItinerary } from './EmptyItinerary';
import {
  ItineraryEditorProps,
  ManyElementDataProps,
} from './EditItinerary.types';
import { CREATE_MONGODB_ITINERARY } from '../../../graphql/mutations/mongodbMutation';
import { FIND_MONGODB_ITINERARY } from '../../../graphql/queries/mongodbQuery';
import { UPDATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { ActiveEditItinerary } from './ActiveEditItinerary';

export const ItineraryEditor: FC<ItineraryEditorProps> = ({ data }) => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });

  const [updateItinerary] = useMutation(UPDATE_ITINERARY);

  const [findMongoItinerary] = useLazyQuery(FIND_MONGODB_ITINERARY, {
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

  useEffect(() => {
    console.log(data);
    if (data['findItineraryByPublicIdentifier']['mongoid']) {
      setMongoid(data.findItineraryByPublicIdentifier.mongoid);
      findMongoItinerary({
        variables: {
          id: data['findItineraryByPublicIdentifier']['mongoid'],
        },
      });
    }
  }, []);

  // Itinerary creates
  const onItineraryCreate = (input: { start: string; end: string }) => {
    if (input['start'] <= input['end']) {
      createMongoItinerary({
        variables: {
          beginning: input['start'],
          end: input['end'],
        },
      }).then(returnData => {
        updateItinerary({
          variables: {
            public_identifier:
              data.findItineraryByPublicIdentifier.public_identifier,
            title: data.findItineraryByPublicIdentifier.title,
            mongoid: returnData.data.createItinerary._id,
          },
        });

        setMongoid(returnData.data.createItinerary._id);
        delete returnData.data.createItinerary._id;
        setElements(returnData.data.createItinerary);
      });
    } else {
      alert('Date range is not valid! Try again!');
    }
  };

  if (Object.keys(elements).length === 0) {
    return <EmptyItinerary onItineraryCreate={onItineraryCreate} />;
  } else {
    return (
      <ActiveEditItinerary
        elements={elements}
        setElements={setElements}
        mongoId={mongoid}
        public_identifier={
          data.findItineraryByPublicIdentifier.public_identifier
        }
      />
    );
  }
};
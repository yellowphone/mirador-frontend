import React, { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyItinerary } from './EmptyItinerary';
import { ActiveItinerary } from '../ActiveItinerary';
import { ManyElementDataProps } from './CreateItinerary.types';
import { CREATE_MONGODB_ITINERARY } from '../../../graphql/mutations/mongodbMutation';

export const ItineraryBuilder = (): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });

  // Itinerary creates
  const onItineraryCreate = (input: { start: string; end: string }) => {
    if (input['start'] <= input['end']) {
      createMongoItinerary({
        variables: {
          beginning: input['start'],
          end: input['end'],
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

  if (Object.keys(elements).length === 0) {
    return <EmptyItinerary onItineraryCreate={onItineraryCreate} />;
  } else {
    return (
      <ActiveItinerary
        elements={elements}
        setElements={setElements}
        mongoId={mongoid}
      />
    );
  }
};

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { EmptyTrip } from './EmptyTrip';
import { TripEditorProps, ManyElementDataProps } from './EditTrip.types';
import { CREATE_MONGODB_TRIP } from '../../../graphql/mutations/mongodbMutation';
import { FIND_MONGODB_TRIP } from '../../../graphql/queries/mongodbQuery';
import { UPDATE_TRIP } from '../../../graphql/mutations/tripMutation';
import { ActiveEditTrip } from './ActiveEditTrip';

export const TripEditor: FC<TripEditorProps> = ({ data }): ReactElement => {
  const [mongoid, setMongoid] = useState('');
  const [elements, setElements] = useState<ManyElementDataProps>({});

  const [createMongoTrip] = useMutation(CREATE_MONGODB_TRIP, {
    client: mongodbClient,
  });

  const [updateTrip] = useMutation(UPDATE_TRIP);

  const [findMongoTrip] = useLazyQuery(FIND_MONGODB_TRIP, {
    client: mongodbClient,
    onCompleted: incomingData => {
      // const tempData: ManyElementDataProps = {};
      // Object.keys(incomingData.findTrip).map((key, index) => {
      //   if (key != '_id') {
      //     tempData[key] = incomingData.findTrip[key];
      //   }
      // });
      // setElements(tempData);

      setElements(incomingData.findTrip.trip);
    },
    onError: err => console.error(err),
  });

  useEffect(() => {
    console.log(data);
    if (data['findTripByPublicIdentifier']['mongoid']) {
      setMongoid(data.findTripByPublicIdentifier.mongoid);
      findMongoTrip({
        variables: {
          id: data['findTripByPublicIdentifier']['mongoid'],
        },
      });
    }
  }, []);

  // Trip creates
  const onTripCreate = (start: string, end: string) => {
    if (start <= end) {
      createMongoTrip({
        variables: {
          beginning: start,
          end,
        },
      }).then(returnData => {
        updateTrip({
          variables: {
            public_identifier:
              data.findTripByPublicIdentifier.public_identifier,
            title: data.findTripByPublicIdentifier.title,
            mongoid: returnData.data.createTrip._id,
          },
        });

        setMongoid(returnData.data.createTrip._id);
        setElements(returnData.data.createTrip.trip);
      });
    } else {
      alert('Date range is not valid! Try again!');
    }
  };

  if (Object.keys(elements).length === 0) {
    return (
      <EmptyTrip
        onTripCreate={onTripCreate}
        public_identifier={data.findTripByPublicIdentifier.public_identifier}
      />
    );
  } else {
    return (
      <ActiveEditTrip
        elements={elements}
        setElements={setElements}
        mongoId={mongoid}
        public_identifier={data.findTripByPublicIdentifier.public_identifier}
        title={data.findTripByPublicIdentifier.title}
      />
    );
  }
};

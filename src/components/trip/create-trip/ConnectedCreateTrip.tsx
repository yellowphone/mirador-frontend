import { NoLogin } from '../../shared/no-login/NoLogin';
import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { CREATE_MONGODB_TRIP } from '../../../graphql/mutations/mongodbMutation';
import { useCookies } from 'react-cookie';
import { CREATE_TRIP } from '../../../graphql/mutations/tripMutation';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';

export const ConnectedCreateTrip = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const history = useHistory();

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
        history.push(
          Paths.EditTrip + '/' + sqlData.data.createTrip.public_identifier
        );
      });
    },
    [cookie, createTrip, history]
  );

  useEffect(() => {
    createMongoTrip().then(data => {
      createTripHelper(data);
    });
  }, [createTripHelper, createMongoTrip]);

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && <></>}
    </>
  );
};

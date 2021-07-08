import React, { useState } from 'react';
import { EditTrip } from './EditTrip';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';
import { useLocation } from 'react-router';
import { FIND_TRIP_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/tripQuery';
import { useQuery } from '@apollo/client';
import { TSFixMe } from '../../../types/global';

export const ConnectedEditTrip = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);
  const location = useLocation();
  const [data, setData] = useState<TSFixMe>({});

  useQuery(FIND_TRIP_BY_PUBLIC_IDENTIFIER, {
    variables: { public_identifier: location.pathname.split('/')[3] },
    onCompleted: returnData => {
      console.log(returnData);
      setData(returnData);
    },
    onError: error => {
      console.error(error);
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      {!cookie['user'] && !data.findTripByPublicIdentifier && <NoLogin />}
      {cookie['user'] && data.findTripByPublicIdentifier && (
        <EditTrip data={data} />
      )}
    </>
  );
};

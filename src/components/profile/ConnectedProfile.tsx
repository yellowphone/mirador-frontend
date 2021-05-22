import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_USER } from '../../graphql/queries/userQuery';
import { TSFixMe } from '../../types/global';
import { Profile } from './Profile';

export const ConnectedProfile = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [data, setData] = useState<TSFixMe>({});

  console.log(data);

  useQuery(FIND_USER, {
    variables: {
      pkuser: cookie['user']['pkuser'],
    },
    onCompleted: incomingData => {
      setData(incomingData.findUser);
    },
    fetchPolicy: 'cache-and-network',
  });

  return <Profile data={data} />;
};

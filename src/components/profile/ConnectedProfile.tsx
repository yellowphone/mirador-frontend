import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_USER } from '../../graphql/queries/userQuery';
import { TSFixMe } from '../../types/global';
import { Profile } from './Profile';

export const ConnectedProfile = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [userData, setUserData] = useState<TSFixMe>({});

  console.log(userData);

  useQuery(FIND_USER, {
    variables: {
      pkuser: cookie['user']['pkuser'],
    },
    onCompleted: incomingData => {
      setUserData(incomingData.findUser);
    },
    fetchPolicy: 'cache-and-network',
  });

  return <Profile userData={userData} />;
};

import React from 'react';
import { CreateTrip } from './CreateTrip';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';

export const ConnectedCreateTrip = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && <CreateTrip />}
    </>
  );
};

import React from 'react';
import { CreateItinerary } from './CreateItinerary';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';

export const ConnectedCreateItinerary = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && <CreateItinerary />}
    </>
  );
};

import React from 'react';
import { EditItinerary } from './EditItinerary';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';

export const ConnectedEditItinerary = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && <EditItinerary />}
    </>
  );
};

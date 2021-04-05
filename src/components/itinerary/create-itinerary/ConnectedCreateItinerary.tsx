import React from 'react';
import { useHistory } from 'react-router-dom';
import { CreateItinerary } from './CreateItinerary';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';

export const ConnectedCreateItinerary = (): React.ReactNode => {
  const history = useHistory();

  const [cookie] = useCookies(['user']);

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && <CreateItinerary history={history} />}
    </>
  );
};

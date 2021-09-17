import { useCookies } from 'react-cookie';
import { Users } from '../../trip/single-trip/SingleTrip.types';

export const CheckPermissions = (users: Users): boolean => {
  const [cookie] = useCookies(['user']);
  if (!cookie.user) {
    return false;
  }
  if (cookie.user && cookie.user.pkuser == users.pkuser) {
    return true;
  }
  //   include user_trips at some point
  return false;
};

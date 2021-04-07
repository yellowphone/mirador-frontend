import { BehaviorSubject } from 'rxjs';

export enum Account {
  Undefined,
  Google,
  Facebook,
}

export interface IUserContext {
  pkuser?: string;
  email: string;
  lastname: string;
  firstname: string;
  user_id: string;
  image_url: string;
  fullname: string;
  access_token: string;
  accountType: Account;
}

const userContext = new BehaviorSubject<IUserContext | undefined>(undefined);

export const setUserContext = (user?: IUserContext): void => {
  if (user) {
    userContext.next({
      ...user,
      fullname: `${user.firstname} ${user.lastname}`,
    });
  } else if (typeof user === 'undefined') {
    console.log('User logout');
    userContext.next(undefined);
  } else {
    console.error('user data has not been set yet.');
  }
};

export const getUserContext = (): IUserContext | undefined =>
  userContext.getValue();

export const logout = (): void => {
  if (!userContext) {
    return;
  }
  const accountType = userContext.getValue()?.accountType ?? Account.Undefined;
  if (accountType === Account.Google) {
    gapi.auth2.getAuthInstance().signOut();
  } else if (accountType === Account.Facebook) {
    FB.logout();
  }
};

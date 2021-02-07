import { BehaviorSubject } from "rxjs";

export enum Account {
    Undefined,
    Google,
    Facebook,
}

export interface IUserContext {
    pkUser?: string;
    email: string;
    lastname: string;
    firstname: string;
    user_id: string;
    image_url: string;
    fullname: string;
    access_token: string;
    accountType: Account;
}

let userContext = new BehaviorSubject<IUserContext | undefined>(undefined);

export const setUserContext = async (
    user: any,
) => {
    if (user) {
        userContext.next({
            ...user,
            fullname: `${user.firstname} ${user.lastname}`
        });
    } else {
        console.error('user data has not been set yet.')
    }
};

export const getUserContext = (): IUserContext | undefined => userContext.getValue();

export const logout = () => {
    if (!userContext) {
        return;
    }
    const accountType = userContext.getValue()?.accountType ?? Account.Undefined;
    if (accountType === Account.Google) {
        gapi.auth2.getAuthInstance().signOut();
    }
    else if (accountType === Account.Facebook) {
        FB.logout();
    }
};
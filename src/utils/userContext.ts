import { BehaviorSubject } from "rxjs";

export enum Account {
    Undefined,
    Google,
    Facebook,
}

export interface IUserContext {
    email: string;
    lastName: string;
    firstName: string;
    userId: string;
    imageUrl: string;
    fullName: string;
    accessToken: string;
    accountType: Account;
}

let userContext = new BehaviorSubject<IUserContext | undefined>(undefined);

export const setUserContext = (
    fullName: string,
    email: string,
    userId: string,
    imageUrl: string,
    accessToken: string,
    accountType: Account
) => {
    const name = fullName.split(' ');
    const _userContext = {
        email: email,
        firstName: name[0],
        lastName: name[1],
        userId: userId,
        imageUrl: imageUrl,
        fullName: fullName,
        accessToken: accessToken,
        accountType: accountType
    };

    userContext.next(_userContext);
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
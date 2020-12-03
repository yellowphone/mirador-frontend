import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { ActionBar } from './ActionBar';

export const Profile = () => {

    return (
        <>
            <NavigationBar />
            <ActionBar />
            <h1>Profile</h1>
        </>
    );
}
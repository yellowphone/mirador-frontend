import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';

export const Profile = () => {
    return (
        <>
            <NavigationBar />
            <ProfileCard />
            <ActionBar />
        </>
    );
}
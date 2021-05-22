import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';

export const Profile = ({ data }): React.ReactElement => {
  return (
    <>
      <NavigationBar />
      <ProfileCard />
      <ActionBar />
    </>
  );
};

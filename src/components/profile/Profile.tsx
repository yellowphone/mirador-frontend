import React from 'react';
import { TSFixMe } from '../../types/global';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';

export const Profile = ({ data }: { data: TSFixMe }): React.ReactElement => {
  return (
    <>
      <NavigationBar />
      <ProfileCard />
      <ActionBar />
    </>
  );
};

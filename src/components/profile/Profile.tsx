import React from 'react';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';

export const Profile = (): React.ReactElement => {
  return (
    <>
      <ProfileCard />
      <ActionBar />
    </>
  );
};

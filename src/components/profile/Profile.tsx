import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';

import { useQuery } from '@apollo/react-hooks';

import { FIND_USER } from '../../graphql/queries/userQuery';

export const Profile = () => {

    // const { data, loading, error, refetch } = useQuery(FIND_USER, {
    //     variables: { pkuser: 1 },
    // });

    // if (loading) {
    //     return <h1>Loading</h1>
    // }
    // if (error) {
    //     console.error(error)
    //     return <h1>Error!</h1>
    // }

    // console.log(data);

    return (
        <>
            <NavigationBar />
            <ProfileCard />
            <ActionBar />
        </>
    );
}
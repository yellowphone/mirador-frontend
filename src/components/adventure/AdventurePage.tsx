import React, { useState, FC } from "react";
import { useQuery } from '@apollo/react-hooks';

import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { FIND_ADVENTURE_BY_ID } from '../../graphql/queries/adventureQuery';

interface IAdventurePageProps {
    history: object
}

export const AdventurePage: FC<IAdventurePageProps> = ({ history }) => {
    
    const { data, loading, error, refetch } = useQuery(FIND_ADVENTURE_BY_ID, {
        variables: { pkadventure: history.location.state.fk_adventure_location }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    console.log(data)
    const id = data["findAdventureById"]["pkadventure"]
    const title = data["findAdventureById"]["title"]
    const lat = (data["findAdventureById"]["locations"]["lat"])
    const lng = (data["findAdventureById"]["locations"]["lng"])

    return(
        <>
            <NavigationBar />
            <div>
                Hello, World!
                <h1>{title}</h1>
                <p>primary key of this adventure: {id}</p>
                <p>lat: {lat}</p>
                <p>lng: {lng}</p>
            </div>
        </>
    )
}
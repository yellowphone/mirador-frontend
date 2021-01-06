import React, { useState, FC } from "react";
import { useQuery } from '@apollo/react-hooks';

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { FIND_ADVENTURE_BY_ID } from '../../../graphql/queries/adventureQuery';

import { ISingleAdventureProps } from './SingleAdventure.type'

export const SingleAdventure: FC<ISingleAdventureProps> = ({ history }) => {
    
    const { data, loading, error, refetch } = useQuery(FIND_ADVENTURE_BY_ID, {
        variables: { pkadventure: history.location.state.pkadventure }
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
    const miles = data["findAdventureById"]["miles"]
    const elevation = data["findAdventureById"]["elevation"]
    const summary = data["findAdventureById"]["summary"]
    const lat = (data["findAdventureById"]["locations"]["lat"])
    const lng = (data["findAdventureById"]["locations"]["lng"])

    return(
        <>
            <NavigationBar />
            <div>
                <h1>{title}</h1>
                <p>primary key of this adventure: {id}</p>
                <p>lat: {lat}</p>
                <p>lng: {lng}</p>
                <p>summary: {summary}</p>
                <p>miles: {miles}</p>
                <p>elevation: {elevation}</p>
            </div>
        </>
    )
}
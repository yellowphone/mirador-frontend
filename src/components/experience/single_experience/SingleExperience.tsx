import React, { FC } from "react";

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';

import { SingleExperienceProps } from './SingleExperience.type'

export const SingleExperience: FC<SingleExperienceProps> = ({ data }) => {

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
                <p>primary key of this experience: {id}</p>
                <p>lat: {lat}</p>
                <p>lng: {lng}</p>
                <p>summary: {summary}</p>
                <p>miles: {miles}</p>
                <p>elevation: {elevation}</p>
            </div>
        </>
    )
}
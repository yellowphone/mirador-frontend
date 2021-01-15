import React, { FC } from "react";

import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';

import { SingleExperienceProps } from './SingleExperience.type'

export const SingleExperience: FC<SingleExperienceProps> = ({ data }) => {

    console.log(data)
    const id = data["findExperienceById"]["pkexperience"]
    const title = data["findExperienceById"]["title"]
    const miles = data["findExperienceById"]["miles"]
    const elevation = data["findExperienceById"]["elevation"]
    const summary = data["findExperienceById"]["summary"]
    const lat = (data["findExperienceById"]["experience_locations"]["lat"])
    const lng = (data["findExperienceById"]["experience_locations"]["lng"])

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
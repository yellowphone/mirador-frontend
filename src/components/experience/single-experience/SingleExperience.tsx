import { Stack, Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { TagGrid } from "../../shared/media/Tags/TagGrid";

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
    const tags = (data["findExperienceById"]["experience_tags"])

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
                <TagGrid tags={tags}/>
            </div>
            <Stack direction="row">
                { data["findExperienceById"]["experience_images"] && data["findExperienceById"]["experience_images"].map((image: Object, index: number) => {
                    // console.log(image["images"]["url"])
                    return(
                        <Image key={index} boxSize="100px" src={image["images"]["url"]} />
                    )
                    
                }) }
            </Stack>
        </>
    )
}
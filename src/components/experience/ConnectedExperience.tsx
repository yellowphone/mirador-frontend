import React, { useState } from "react";
import { DifficultyType } from "../shared/media/Badges/Badges.types";
import { Experience } from "./Experience";
import { IExperience } from "./Experience.types";

import { useQuery } from '@apollo/react-hooks';

import { FIND_EXPERIENCE_BY_COORDINATES } from '../../graphql/queries/experienceQuery';

export const ConnectedExperience = () => {

    const [coords, setCoords] = useState({lat: 44.349483, lng: -68.187912});

    const { data: experienceItems, loading, error, refetch } = useQuery(FIND_EXPERIENCE_BY_COORDINATES, {
        variables: { lat: coords["lat"], lng: coords["lng"] },
    });

    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    console.log(experienceItems)

    const experienceList: Array<IExperience> = experienceItems?.findExperienceByCoordinates?.map((item: IExperience) => {
        return {
            fk_experience_location: item.fk_experience_location,
            imageUrl: "http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg",
            imageAlt: "ok",
            miles: item.miles,
            elevation: item.elevation,
            title: item.title,
            summary: item.summary,
            rating: 4,
            lat: item.lat,
            lng: item.lng,
            difficulty: item.difficulty
        }
    })

    return (
        <Experience experiences={experienceList} coords={coords} setCoords={setCoords} refetch={refetch} />
    );
}
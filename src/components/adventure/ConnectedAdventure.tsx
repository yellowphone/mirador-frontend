import React, { useState } from "react";
import { DifficultyType } from "../shared/media/Badges/Badges.types";
import { Adventure } from "./Adventure";
import { IAdventure } from "./Adventure.types";

import { useQuery } from '@apollo/react-hooks';

import { FIND_ADVENTURE_BY_COORDINATES } from '../../graphql/queries/adventureQuery';

export const ConnectedAdventure = () => {

    const [coords, setCoords] = useState({lat: 44.349483, lng: -68.187912});

    const { data: adventureItems, loading, error, refetch } = useQuery(FIND_ADVENTURE_BY_COORDINATES, {
        variables: { lat: coords["lat"], lng: coords["lng"] },
    });

    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    console.log(adventureItems)

    const adventureList: Array<IAdventure> = adventureItems?.findAdventureByCoordinates?.map((item: IAdventure) => {
        return {
            fk_adventure_location: item.fk_adventure_location,
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
        <Adventure adventures={adventureList} coords={coords} setCoords={setCoords} refetch={refetch} />
    );
}

import React from "react";
import { DifficultyType } from "../shared/media/Badges/Badges.types";
import { Experience } from "./Experience";
import { IExperience } from "./Experience.types";

export const ConnectedExperience = () => {
    const mockAdventures: Array<IExperience> = [
        {
            title: 'Precipice Trail',
            imageAlt: 'Image of Precipice Trail',
            imageUrl: 'http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg',
            elevation: 1058,
            length: 2.5,
            lat: 44.349485,
            lng: -68.187919,
            rating: 4,
            difficulty: DifficultyType.Hard,
        },
        {
            title: 'Beehive Trail',
            imageAlt: 'Image of Beehive Trail',
            imageUrl: 'https://th.bing.com/th/id/OIP.piYHL8KV0-odJWVOc9TmFQHaE6?pid=Api&rs=1',
            elevation: 502,
            length: 1.6,
            lat: 44.3417976,
            lng: -68.2650598,
            rating: 5,
            difficulty: DifficultyType.Medium,
        },
        {
            title: 'Great Head Trail',
            imageAlt: 'Image of Great Head Trail',
            imageUrl: 'http://www.acadiamagic.com/1200px/otter-cliff-15.jpg',
            elevation: 200,
            length: 1.4,
            lat: 44.3417976,
            lng: -68.2650598,
            rating: 5,
            difficulty: DifficultyType.Easy,
        }
    ];

    return (
        <Experience experiences={mockAdventures} />
    );
}

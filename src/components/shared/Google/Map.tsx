import React, { FC, useCallback, useEffect } from 'react';
import { IAdventure } from './../../adventure/Adventure.types';

import { Loader } from '@googlemaps/js-api-loader';

interface IMapDataProps {
    width: number,
    height: number,
    loader: Loader,
    coords: Array<number>,
    adventures: Array<IAdventure>
}

export const Map: FC<IMapDataProps> = ({ height, width, loader, coords, adventures }) => {

    var mapOptions = {
        center: {
            lat: coords[0],
            lng: coords[1]
        },
        zoom: 10,
        options: {
            gestureHandling: "greedy"
        }
    };

    var iconBase = "https://lh3.googleusercontent.com/ak_p7XchXRmvQb6BOMFKNMiyjkexq7JA0NZuy_hx7jWWjTfE79FOhrkPSsT5vxpmA6HKn3efihvcjiipUyJI8tGBauEoWRE2NH8SroSd-9b49wrrVBXdAK78qkwr4p_hLPajHVA_780=w50"

    loader
    .load()
    .then(() => {
        const div = document.getElementById('map')
        if (!div) {
            throw new Error("Google Maps error\nMost likely an issue with loading in Google Maps API")
        }
        const map = new google.maps.Map(div, mapOptions);

        const centerMarker = new google.maps.Marker({
            position: {lat: coords[0], lng: coords[1]},
            map: map,
            icon: iconBase
        })

        adventures.map(x => {
            const newMarker = new google.maps.Marker({
                position: {lat: x.lat, lng: x.lng},
                map: map
            })
        })

    })
    .catch(e => {
        console.log(e)
    });
    


    return (
        <div style={{ height, width }} id='map'/>
    );
}


import React, { FC, useCallback, useEffect } from 'react';

import { Loader } from '@googlemaps/js-api-loader';

interface IMapDataProps {
    width: number,
    height: number,
    loader: Loader,
    coords: Array<number>
}

export const Map: FC<IMapDataProps> = ({ height, width, loader, coords }) => {

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

    var iconBase = "https://lh3.googleusercontent.com/ak_p7XchXRmvQb6BOMFKNMiyjkexq7JA0NZuy_hx7jWWjTfE79FOhrkPSsT5vxpmA6HKn3efihvcjiipUyJI8tGBauEoWRE2NH8SroSd-9b49wrrVBXdAK78qkwr4p_hLPajHVA_780=w90"

    loader
    .load()
    .then(() => {
        const div = document.getElementById('map')
        if (!div) {
            throw new Error("uh ohhhhh")
        }
        const map = new google.maps.Map(div, mapOptions);

        const marker = new google.maps.Marker({
            map: map,
            icon: iconBase
        })
        marker.setPosition({lat: coords[0], lng: coords[1]})
    })
    .catch(e => {
        console.log(e)
    });
    


    return (
        <div style={{ height, width }} id='map'/>
    );
}


// import GoogleMapReact from 'google-map-react';
import React, { FC, useCallback, useEffect } from 'react';

import { Loader } from '@googlemaps/js-api-loader';

const center = {
    lat: 37.223454,
    lng: -80.424
}

interface IMapDataProps {
    width: number,
    height: number,
    loader: Loader
}

export const Map: FC<IMapDataProps> = ({ height, width, loader }) => {

    const mapOptions = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 4,
        options: {
            gestureHandling: "greedy"
        }
    };

    loader
    .load()
    .then(() => {
        const div = document.getElementById('map')
        if (!div) {
            throw new Error("uh ohhhhh")
        }
        new google.maps.Map(div, mapOptions);
    })
    .catch(e => {
        console.log(e)
    });
    


    return (
        <div style={{ height, width }} id='map'/>
    );
}


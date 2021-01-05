import React, { FC, useCallback, useEffect } from 'react';
import { IAdventure, ICoordinates } from './../../adventure/Adventure.types';

import { Loader } from '@googlemaps/js-api-loader';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';

interface IMapDataProps {
    width: number,
    height: number,
    loader: Loader,
    coords: ICoordinates,
    adventures: Array<IAdventure>
}

export const Map: FC<IMapDataProps> = ({ height, width, loader, coords, adventures }) => {

    var mapOptions = {
        center: {
            lat: coords["lat"],
            lng: coords["lng"]
        },
        zoom: 10,
        options: {
            gestureHandling: "greedy"
        }
    };

    const history = useHistory();

    loader.load()
    .then(() => {
        const div = document.getElementById('map')
        if (!div) {
            throw new Error("Google Maps error\nMost likely an issue with loading in Google Maps API")
        }
        const map = new google.maps.Map(div, mapOptions);

        var iconBase = {
            url: "https://www9.lunapic.com/editor/premade/transparent.gif",
            scaledSize: new google.maps.Size(50, 50)
        }

        const centerMarker = new google.maps.Marker({
            position: {lat: coords["lat"], lng: coords["lng"]},
            map: map,
            icon: iconBase
        })

        adventures.map(x => {
            const newMarker = new google.maps.Marker({
                position: {lat: x.lat, lng: x.lng},
                map: map
            });
            newMarker.addListener('click', e => {
                history.push(Paths.SingleAdventure, { pkadventure: x.fk_adventure_location })
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


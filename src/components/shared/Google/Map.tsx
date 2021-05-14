import React, { FC, useState } from 'react';
import { IExperience, ICoordinates } from '../../experience/Experience.types';
import { Loader } from '@googlemaps/js-api-loader';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Paths } from '../../../utils/paths';
import styled from 'styled-components';
import {
  AUTOCOMPLETE_INPUT_HEIGHT,
  HEADER_HEIGHT,
} from '../../../utils/styles/constants';

interface IMapDataProps {
  loader: Loader;
  coords: ICoordinates;
  experiences: IExperience[];
  displayInfoWindow?: boolean;
}

const StyledMap = styled.div`
  // subtract height of header & autocomplete
  height: calc(100vh - ${HEADER_HEIGHT + AUTOCOMPLETE_INPUT_HEIGHT}px);
  width: 100%;
`;

export const Map: FC<IMapDataProps> = ({
  loader,
  coords,
  experiences,
  displayInfoWindow = false,
}) => {
  let map: google.maps.Map;
  let timeoutId: NodeJS.Timeout | null;
  let mouseOverInfoWindow = false;

  const mapOptions = {
    center: {
      lat: coords.lat,
      lng: coords.lng,
    },
    zoom: 14,
    mapId: 'f80062b618e0b095',
    options: {
      mapTypeControl: false,
      gestureHandling: 'greedy',
    },
  };

  const history = useHistory();

  const createMarkerAndAddRoute = (experience: IExperience) => {
    const { lat, lng, public_identifier } = experience;
    const newMarker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
    newMarker.addListener('click', () => {
      history.push(`${Paths.SingleExperience}/${public_identifier}`);
    });
  };

  const makeMarkerDraggable = (experience: IExperience) => {
    const {
      fk_experience_location,
      title,
      imageAlt,
      imageUrl,
      miles,
      elevation,
    } = experience;

    const div = document.createElement('div');
    div.innerHTML = `
      <div>
        <h2 style="font-size: 20px;">${title}</h2>
        <img src=${imageUrl} width="200" />
        <p>${miles} miles - ${elevation} feet</p>
      </div>
    `;
    // Add infowindow content! img, title, etc
    div.draggable = true;
    div.ondragstart = function (e) {
      const dataForItineraryElement = {
        pkexperience: fk_experience_location,
        title: title,
        imgUrl: imageUrl,
        imgAlt: imageAlt,
      };
      e.dataTransfer &&
        e.dataTransfer.setData(
          'element',
          JSON.stringify(dataForItineraryElement)
        );
    };
    return div;
  };

  const addOpenInfoWindowListeners = (infoWindow: google.maps.InfoWindow) => {
    const infoWindowElement = document.querySelector('.gm-style .gm-style-iw');

    if (infoWindowElement && infoWindowElement.parentNode) {
      infoWindowElement?.addEventListener('mouseleave', function () {
        infoWindow.close();
        mouseOverInfoWindow = false;
      });

      infoWindowElement?.addEventListener('mouseenter', function () {
        mouseOverInfoWindow = true;
      });
    }
  };

  const createInteractiveMarker = (experience: IExperience) => {
    const { lat, lng } = experience;
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });

    const div = makeMarkerDraggable(experience);

    const infoWindow = new google.maps.InfoWindow({
      content: div,
    });

    marker.addListener('mouseover', () => {
      if (timeoutId) clearTimeout(timeoutId);
      infoWindow.open(map, marker);
      addOpenInfoWindowListeners(infoWindow);
    });

    marker.addListener('mouseout', () => {
      timeoutId = setTimeout(() => {
        if (!mouseOverInfoWindow) {
          infoWindow.close();
        }
      }, 500);
    });
  };

  loader
    .load()
    .then(() => {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        throw new Error(
          'Google Maps error\nMost likely an issue with loading in Google Maps API'
        );
      }
      map = new google.maps.Map(mapContainer, mapOptions);

      if (!displayInfoWindow) {
        experiences.map(createMarkerAndAddRoute);
      } else {
        experiences.map(createInteractiveMarker);
      }
    })
    .catch(e => {
      // TODO: need to do something with error state.
      console.error(e);
    });

  return <StyledMap id="map" />;
};

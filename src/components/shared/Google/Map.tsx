import React, { FC } from 'react';
import { IExperience } from '../../experience/Experience.types';
import { Loader } from '@googlemaps/js-api-loader';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import styled from 'styled-components';
import {
  AUTOCOMPLETE_INPUT_HEIGHT,
  HEADER_HEIGHT,
} from '../../../utils/styles/constants';
import { useLocationContext } from '../../../context/LocationContext';

interface IMapDataProps {
  loader: Loader;
  experiences: IExperience[];
  infoWindow: boolean;
}

const StyledMap = styled.div`
  // subtract height of header & autocomplete
  height: calc(100vh - ${HEADER_HEIGHT + AUTOCOMPLETE_INPUT_HEIGHT}px);
  width: 100%;
`;

export const Map: FC<IMapDataProps> = ({ loader, experiences, infoWindow }) => {
  const {
    coords: { lat, lng },
  } = useLocationContext();
  const mapOptions = {
    center: {
      lat,
      lng,
    },
    zoom: 14,
    mapId: 'f80062b618e0b095',
    options: {
      mapTypeControl: false,
      gestureHandling: 'greedy',
    },
  };

  const history = useHistory();

  loader
    .load()
    .then(() => {
      const div = document.getElementById('map');
      if (!div) {
        throw new Error(
          'Google Maps error\nMost likely an issue with loading in Google Maps API'
        );
      }
      const map = new google.maps.Map(div, mapOptions);

      if (!infoWindow) {
        experiences.map(x => {
          const newMarker = new google.maps.Marker({
            position: { lat: x.lat, lng: x.lng },
            map: map,
          });
          newMarker.addListener('click', () => {
            history.push(Paths.SingleExperience + '/' + x.public_identifier);
          });
        });
      } else {
        experiences.map(x => {
          const newMarker = new google.maps.Marker({
            position: { lat: x.lat, lng: x.lng },
            map: map,
          });

          const div = document.createElement('div');
          div.innerHTML = `
                <div>
                    <h2 style="font-size: 20px;">${x.title}</h2>
                    <img src=${x.imageUrl} width="200" />
                    <p>${x.miles} miles - ${x.elevation} feet</p>
                </div>
                `;
          // Add infowindow content! img, title, etc
          div.draggable = true;
          div.ondragstart = function (e) {
            const dataForItineraryElement = {
              pkexperience: x.fk_experience_location,
              title: x.title,
              imgUrl: x.imageUrl,
              imgAlt: x.imageAlt,
            };
            e.dataTransfer &&
              e.dataTransfer.setData(
                'element',
                JSON.stringify(dataForItineraryElement)
              );
          };

          const newInfoWindow = new google.maps.InfoWindow({
            content: div,
          });

          newMarker.addListener('click', () => {
            newInfoWindow.open(map, newMarker);
          });
        });
      }
    })
    .catch(e => {
      console.log(e);
    });

  return <StyledMap id="map" />;
};

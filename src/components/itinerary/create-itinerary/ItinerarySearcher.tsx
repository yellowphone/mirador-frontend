import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { FIND_EXPERIENCE_BY_COORDINATES } from '../../../graphql/queries/experienceQuery';
import { Search } from '../../shared/Google/Search';
import { Map } from '../../shared/Google/Map';
import { IExperience } from '../../experience/Experience.types';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useLocationContext } from '../../../context/LocationContext';

const ItinerarySearcherContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const ItinerarySearcher = (): React.ReactElement => {
  const {
    coords: { lat, lng },
    setCoords,
  } = useLocationContext();

  useEffect(() => {
    setCoords({ lat: 37.235961, lng: -80.607775 });
  }, [lat, lng, setCoords]);

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const { data: experienceItems, loading, error } = useQuery(
    FIND_EXPERIENCE_BY_COORDINATES,
    {
      variables: { lat, lng },
    }
  );

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  const experienceList: Array<IExperience> = experienceItems?.findExperienceByCoordinates?.map(
    (item: IExperience) => {
      return {
        fk_experience_location: item.fk_experience_location,
        imageUrl: 'http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg',
        imageAlt: 'ok',
        miles: item.miles,
        elevation: item.elevation,
        title: item.title,
        summary: item.summary,
        rating: 4,
        lat: item.lat,
        lng: item.lng,
        difficulty: item.difficulty,
      };
    }
  );

  return (
    <ItinerarySearcherContainer>
      <Search loader={loader} />
      <Map loader={loader} experiences={experienceList} infoWindow={true} />
    </ItinerarySearcherContainer>
  );
};

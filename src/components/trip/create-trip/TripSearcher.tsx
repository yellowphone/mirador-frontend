import React, { useEffect } from 'react';
import { FIND_EXPERIENCE_BY_COORDINATES } from '../../../graphql/queries/experienceQuery';
import { Map } from '../../shared/Google/Map';
import { IExperience } from '../../experience/Experience.types';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useLocationContext } from '../../../utils/context/LocationContext';

const TripSearcherContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const TripSearcher = (): React.ReactElement => {
  const {
    coords: { lat, lng },
    setCoords,
  } = useLocationContext();

  useEffect(() => {
    setCoords({ lat: 37.235961, lng: -80.607775 });
  }, [setCoords]);

  const {
    data: experienceItems,
    loading,
    error,
  } = useQuery(FIND_EXPERIENCE_BY_COORDINATES, {
    variables: { lat, lng },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  const experienceList: Array<IExperience> =
    experienceItems?.findExperienceByCoordinates?.map((item: IExperience) => {
      return {
        fk_experience_location: item.fk_experience_location,
        imageUrl: item.url ? item.url[0] : '',
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
    });

  return (
    <TripSearcherContainer>
      <Map experiences={experienceList} displayInfoWindow={true} />
    </TripSearcherContainer>
  );
};

import React, { useEffect } from 'react';
import { Experience } from './Experience';
import { IExperience } from './Experience.types';

import { useQuery } from '@apollo/react-hooks';

import { FIND_EXPERIENCE_BY_COORDINATES } from '../../graphql/queries/experienceQuery';
import { useLocationContext } from '../../utils/context/LocationContext';

export const ConnectedExperience = (): React.ReactElement => {
  const {
    coords: { lat, lng },
    setCoords,
  } = useLocationContext();

  useEffect(() => {
    setCoords({ lat: 44.349483, lng: -68.187912 });
  }, [setCoords]);

  const { data: experienceItems, loading, error } = useQuery(
    FIND_EXPERIENCE_BY_COORDINATES,
    {
      variables: { lat, lng },
      fetchPolicy: 'cache-and-network',
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
        imageUrl: item.url ? item.url[0] : '',
        imageAlt: 'ok',
        miles: item.miles,
        elevation: item.elevation,
        climbing: item.climbing,
        cost: item.cost,
        title: item.title,
        summary: item.summary,
        rating: 4,
        lat: item.lat,
        lng: item.lng,
        difficulty: item.difficulty,
        public_identifier: item.public_identifier,
      };
    }
  );

  return <Experience experiences={experienceList} />;
};

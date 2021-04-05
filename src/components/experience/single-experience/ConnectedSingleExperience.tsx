import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/experienceQuery';

import { SingleExperience } from './SingleExperience';

import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';

export const ConnectedSingleExperience = (): React.ReactNode => {
  const location = useLocation();

  const { data, loading, error } = useQuery(
    FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER,
    {
      variables: { public_identifier: location.pathname.split('/')[2] },
    }
  );

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  return (
    <>
      {!data.findExperienceByPublicIdentifier && <Page404 />}
      {data.findExperienceByPublicIdentifier && (
        <SingleExperience data={data} />
      )}
    </>
  );
};

import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/experienceQuery';
import { Card } from '../../shared/card/Card';
import { IExperience } from '../../experience/Experience.types';
interface BlogExperienceCardProps {
  public_identifier: string;
}

export const BlogExperienceCard: FC<BlogExperienceCardProps> = ({
  public_identifier,
}) => {
  const { data, loading, error } = useQuery(
    FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER,
    {
      variables: {
        public_identifier: public_identifier,
      },
    }
  );

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  const experience: IExperience = {
    fk_experience_location:
      data['findExperienceByPublicIdentifier']['pkexperience'],
    imageUrl: 'http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg',
    imageAlt: 'ok',
    title: data['findExperienceByPublicIdentifier']['title'],
    elevation: data['findExperienceByPublicIdentifier']['elevation'],
    miles: data['findExperienceByPublicIdentifier']['miles'],
    rating: 3,
    lat:
      data['findExperienceByPublicIdentifier']['experience_locations']['lat'],
    lng:
      data['findExperienceByPublicIdentifier']['experience_locations']['lng'],
    summary: data['findExperienceByPublicIdentifier']['summary'],
    difficulty: data['findExperienceByPublicIdentifier']['difficulty'],
    public_identifier:
      data['findExperienceByPublicIdentifier']['public_identifier'],
  };

  return (
    <>
      <Card key={experience['title']} experience={experience} />
    </>
  );
};

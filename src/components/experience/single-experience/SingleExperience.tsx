import { Stack, Image, Container, Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { TagGrid } from '../../shared/media/Tags/TagGrid';

import {
  ExperienceImageInstance,
  SingleExperienceProps,
} from './SingleExperience.type';

export const SingleExperience: FC<SingleExperienceProps> = ({ data }) => {
  const id = data['findExperienceByPublicIdentifier']['pkexperience'];
  const title = data['findExperienceByPublicIdentifier']['title'];
  const miles = data['findExperienceByPublicIdentifier']['miles'];
  const elevation = data['findExperienceByPublicIdentifier']['elevation'];
  const climbing = data['findExperienceByPublicIdentifier']['climbing'];
  const cost = data['findExperienceByPublicIdentifier']['cost'];
  const summary = data['findExperienceByPublicIdentifier']['summary'];
  const lat =
    data['findExperienceByPublicIdentifier']['experience_locations']['lat'];
  const lng =
    data['findExperienceByPublicIdentifier']['experience_locations']['lng'];
  const tags = data['findExperienceByPublicIdentifier']['experience_tags'];

  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>primary key of this experience: {id}</p>
        <p>lat: {lat}</p>
        <p>lng: {lng}</p>
        <p>summary: {summary}</p>
        <p>miles: {miles}</p>
        <p>elevation: {elevation}</p>
        <p>rating: {climbing}</p>
        <p>cost: {cost}</p>
        <TagGrid tags={tags} />
      </div>
      <Container height="200px">
        <Stack direction="row">
          {data['findExperienceByPublicIdentifier']['experience_images'] &&
            data['findExperienceByPublicIdentifier']['experience_images'].map(
              (image: { images: ExperienceImageInstance }, index: number) => {
                return (
                  <Box p="2" size="md" key={index}>
                    <Image key={index} src={image['images']['url']} />
                  </Box>
                );
              }
            )}
        </Stack>
      </Container>
    </>
  );
};

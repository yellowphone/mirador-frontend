import { Text } from '@chakra-ui/layout';
import React, { FC } from 'react';
import styled from 'styled-components';
import { SavedExperiencesDataProps } from './EditItinerary.types';

const SavedExperiencesContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

// in itinerary, get experiences attached to it and return here
// from itinerary_experiences!!
// for now, make a grid with draggable components

export const SavedExperiences: FC<SavedExperiencesDataProps> = ({ data }) => {
  console.log(data.findItineraryByPublicIdentifier);
  return (
    <SavedExperiencesContainer>
      {data.findItineraryByPublicIdentifier.itinerary_experiences.map(
        (experience, index) => {
          return (
            <>
              <Text>{experience.experiences.title}</Text>
              <Text>{experience.experiences.pkexperience}</Text>
              <Text>{experience.experiences.public_identifier}</Text>
            </>
          );
        }
      )}
    </SavedExperiencesContainer>
  );
};

import { Text } from '@chakra-ui/layout';
import React from 'react';
import styled from 'styled-components';

const SavedExperiencesContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

// in itinerary, get experiences attached to it and return here
// from itinerary_experiences!!
// for now, make a grid with draggable components

export const SavedExperiences = (): React.ReactElement => {
  return (
    <SavedExperiencesContainer>
      <Text>hello!!</Text>
    </SavedExperiencesContainer>
  );
};

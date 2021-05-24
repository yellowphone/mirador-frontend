import React, { FC } from 'react';
import styled from 'styled-components';
import { ItineraryBuilder } from './ItineraryBuilder';
import { ItinerarySearcher } from './ItinerarySearcher';

const CreateItineraryContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const CreateItinerary: FC = () => {
  return (
    <>
      <CreateItineraryContainer>
        <ItinerarySearcher />
        <ItineraryBuilder />
      </CreateItineraryContainer>
    </>
  );
};

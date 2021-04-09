import React, { FC } from 'react';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { ItineraryBuilder } from './ItineraryBuilder';
import { ItinerarySearcher } from './ItinerarySearcher';
import styled from 'styled-components';

const CreateItineraryContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 400px;
`;
export const CreateItinerary: FC = () => {
  return (
    <>
      <NavigationBar />
      {/* TODO: ^^^ Create global layout so we don't have to include this on every page. */}
      <CreateItineraryContainer>
        <ItinerarySearcher />
        <ItineraryBuilder />
      </CreateItineraryContainer>
    </>
  );
};

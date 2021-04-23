import React, { FC } from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { ItineraryEditor } from './ItineraryEditor';
import { ItinerarySearcher } from '../create-itinerary/ItinerarySearcher';
import { EditItineraryDataProps } from './EditItinerary.types';

const CreateItineraryContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const EditItinerary: FC<EditItineraryDataProps> = ({ data }) => {
  return (
    <>
      <NavigationBar />
      {/* TODO: ^^^ Create global layout so we don't have to include this on every page. */}
      <CreateItineraryContainer>
        {/* add toggle here */}
        <ItinerarySearcher />
        <ItineraryEditor data={data} />
      </CreateItineraryContainer>
    </>
  );
};

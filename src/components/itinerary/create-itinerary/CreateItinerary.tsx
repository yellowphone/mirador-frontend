import React, { FC } from 'react';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { ItineraryBuilder } from './ItineraryBuilder';
import { ItinerarySearcher } from './ItinerarySearcher';

const CreateItineraryContainer = styled.section`
  position: relative;
`;

export const FloatingItineraryBuilder = styled.article`
  margin: ${spacer16};
  right: 0;
  top: 0;
  position: absolute;
`;

export const CreateItinerary: FC = () => {
  return (
    <>
      <CreateItineraryContainer>
        <ItinerarySearcher />
        <FloatingItineraryBuilder>
          <ItineraryBuilder />
        </FloatingItineraryBuilder>
      </CreateItineraryContainer>
    </>
  );
};

import React, { FC } from 'react';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { TripBuilder } from './TripBuilder';
import { TripSearcher } from './TripSearcher';

const CreateTripContainer = styled.section`
  position: relative;
`;

export const FloatingTripBuilder = styled.article`
  margin: ${spacer16};
  right: 0;
  top: 0;
  position: absolute;
`;

export const CreateTrip: FC = () => {
  return (
    <>
      <CreateTripContainer>
        <TripSearcher />
        <FloatingTripBuilder>
          <TripBuilder />
        </FloatingTripBuilder>
      </CreateTripContainer>
    </>
  );
};

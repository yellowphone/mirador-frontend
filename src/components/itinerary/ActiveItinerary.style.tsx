import { spacer16, spacer8 } from '../../utils/styles/constants';
import styled from 'styled-components';

export const ActiveItineraryWrapper = styled.div`
  margin: ${spacer16};
  overflow: hidden;
`;

export const ItineraryInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: ${spacer8};
  text-transform: uppercase;
`;

export const DayContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const Day = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#E2E8F0' : 'white')};
  border-radius: ${spacer8};
  padding: ${spacer8};
  &:not(:last-child) {
    margin-right: ${spacer16};
  }
`;

export const DayText = styled.p`
  font-weight: bold;
  font-size: 24px;
`;

export const ItineraryDetails = styled.div`
  white-space: nowrap;
`;

export const DragDropContainer = styled.div`
  height: 100vh;
  padding: 0 ${spacer16};
`;

export const CTAContainer = styled.div`
  bottom: 0;
  padding: ${spacer16};
  position: fixed;
`;

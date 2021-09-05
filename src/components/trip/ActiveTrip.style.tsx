import { spacer16, spacer24 } from '../../utils/styles/constants';
import styled from 'styled-components';
import { grey0 } from '../../utils/styles/colors';

export const ActiveTripWrapper = styled.div<{ overflow: string }>`
  height: calc(100vh - 140px);
  overflow: ${({ overflow }) => overflow};
`;

export const NoteWrapper = styled.div`
  overflow: scroll;
  height: calc(100% / 3);
`;

export const TripPlannerWrapper = styled.div`
  overflow: scroll;
  height: calc(100% / 2);
`;

export const TripInfoWrapper = styled.div`
  align-items: center;
  background-color: ${grey0};
  display: flex;
  padding: 0 ${spacer24} ${spacer16} ${spacer24};
  text-transform: uppercase;
`;

export const DragDropContainer = styled.div<{ compact?: boolean }>`
  background-color: ${grey0};
  height: ${({ compact }) => (compact ? '100%' : '100vh')};
  padding: 0 ${spacer24} ${spacer24} ${spacer24};
`;

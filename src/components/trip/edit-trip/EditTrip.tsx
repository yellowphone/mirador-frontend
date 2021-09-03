import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TripEditor } from './TripEditor';
import { TripSearcher } from '../create-trip/TripSearcher';
import { EditTripDataProps } from './EditTrip.types';
import { Box, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { SavedExperiences } from './SavedExperiences';
import { grey0 } from '../../../utils/styles/colors';
import { FloatingTripBuilder } from '../ActiveTrip.style';

const CreateTripContainer = styled.section`
  position: relative;
`;
export const EditTrip: FC<EditTripDataProps> = ({ data }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <CreateTripContainer>
        <Box>
          <Box
            background={grey0}
            d="flex"
            p={2}
            alignItems="baseline"
            position="absolute"
            zIndex="1"
          >
            <Text>Searcher</Text>
            <Switch
              p="0"
              isChecked={checked}
              onChange={() => setChecked(current => !current)}
            />
            <Text>Saved</Text>
          </Box>
          {!checked && <TripSearcher />}
          {checked && <SavedExperiences data={data} />}
        </Box>
        <FloatingTripBuilder>
          <TripEditor data={data} />
        </FloatingTripBuilder>
      </CreateTripContainer>
    </>
  );
};

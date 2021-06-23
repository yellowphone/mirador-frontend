import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ItineraryEditor } from './ItineraryEditor';
import { ItinerarySearcher } from '../create-itinerary/ItinerarySearcher';
import { EditItineraryDataProps } from './EditItinerary.types';
import { Box, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { SavedExperiences } from './SavedExperiences';
import { FloatingItineraryBuilder } from '../create-itinerary/CreateItinerary';
import { grey0 } from '../../../utils/styles/colors';

const CreateItineraryContainer = styled.section`
  position: relative;
`;
export const EditItinerary: FC<EditItineraryDataProps> = ({ data }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <CreateItineraryContainer>
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
          {!checked && <ItinerarySearcher />}
          {checked && <SavedExperiences data={data} />}
        </Box>
        <FloatingItineraryBuilder>
          <ItineraryEditor data={data} />
        </FloatingItineraryBuilder>
      </CreateItineraryContainer>
    </>
  );
};

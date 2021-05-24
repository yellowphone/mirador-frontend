import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ItineraryEditor } from './ItineraryEditor';
import { ItinerarySearcher } from '../create-itinerary/ItinerarySearcher';
import { EditItineraryDataProps } from './EditItinerary.types';
import { Box, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { SavedExperiences } from './SavedExperiences';

const CreateItineraryContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const EditItinerary: FC<EditItineraryDataProps> = ({ data }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <CreateItineraryContainer>
        <Box>
          <Box d="flex" p={2} alignItems="baseline">
            <Text>Searcher</Text>
            <Switch
              p={1}
              isChecked={checked}
              onChange={() => setChecked(current => !current)}
            />
            <Text>Saved</Text>
          </Box>
          {!checked && <ItinerarySearcher />}
          {checked && <SavedExperiences data={data} />}
        </Box>

        <ItineraryEditor data={data} />
      </CreateItineraryContainer>
    </>
  );
};

import { useQuery } from '@apollo/client';
import { Image } from '@chakra-ui/image';
import { Box, SimpleGrid, Text } from '@chakra-ui/layout';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FIND_SAVED_EXPERIENCES_FOR_ITINERARY } from '../../../graphql/queries/itineraryQuery';
import { TSFixMe } from '../../../types/global';
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { SavedExperiencesDataProps } from './EditItinerary.types';

const SavedExperiencesContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const SavedExperiences: FC<SavedExperiencesDataProps> = ({ data }) => {
  const [incomingData, setIncomingData] = useState<TSFixMe>({});
  console.log(data.findItineraryByPublicIdentifier);

  useQuery(FIND_SAVED_EXPERIENCES_FOR_ITINERARY, {
    variables: {
      public_identifier: data.findItineraryByPublicIdentifier.public_identifier,
    },
    onCompleted: incomingData => {
      console.log(incomingData);
      setIncomingData(incomingData);
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SavedExperiencesContainer>
      <SimpleGrid columns={2} spacing={5}>
        {incomingData.findItineraryByPublicIdentifier &&
          incomingData.findItineraryByPublicIdentifier.itinerary_experiences.map(
            (experience: TSFixMe, index: number) => {
              return (
                <>
                  <Box
                    draggable
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="md"
                    onDragStart={e => {
                      const dataForItineraryElement = {
                        pkexperience: experience.experiences.pkexperience,
                        title: experience.experiences.title,
                        imgUrl:
                          experience.experiences.experience_images[0].images
                            .url,
                        imgAlt: 'yay',
                      };
                      e.dataTransfer &&
                        e.dataTransfer.setData(
                          'element',
                          JSON.stringify(dataForItineraryElement)
                        );
                    }}
                  >
                    <Box p="2" size="sm">
                      {experience.experiences.experience_images && (
                        <Image
                          src={
                            experience.experiences.experience_images[0].images
                              .url
                          }
                          sizes="sm"
                        />
                      )}
                    </Box>
                    <Box p="2">
                      <TagGrid tags={experience.experiences.experience_tags} />
                      <Text>{experience.experiences.title}</Text>
                    </Box>
                  </Box>
                </>
              );
            }
          )}
      </SimpleGrid>
    </SavedExperiencesContainer>
  );
};

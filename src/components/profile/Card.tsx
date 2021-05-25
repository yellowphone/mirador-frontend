import { Heading, Box, Image, WrapItem, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { Paths } from '../../utils/paths';
import { IBlog } from '../blog/Blog.types';
import { Experience } from '../experience/single-experience/SingleExperience.type';
import { FindItineraryByIdObject } from '../itinerary/single-itinerary/SingleItinerary.types';

export const ExperienceCard = ({
  experience,
}: {
  experience: Experience;
}): ReactElement => {
  const history = useHistory();
  const { title, experience_images, public_identifier } = experience;
  return (
    <WrapItem
      onClick={() =>
        history.push(`${Paths.SingleExperience}/${public_identifier}`)
      }
    >
      <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {experience_images.length ? (
          <Image
            src={experience_images[0].images.url}
            objectFit="cover"
            height="200px"
            width="100%"
          />
        ) : (
          <Box height="200px">No image</Box>
        )}
        <Box p="6">
          <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>
        </Box>
      </Box>
    </WrapItem>
  );
};

export const BlogCard = ({ blog }: { blog: IBlog }): ReactElement => {
  const history = useHistory();
  const { title, summary, public_identifier } = blog;
  return (
    <WrapItem
      onClick={() => history.push(`${Paths.SingleBlog}/${public_identifier}`)}
    >
      <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box background="papayawhip" height="75px" />
        <Box p="4">
          <Heading size="md" mb="2">
            {title}
          </Heading>
          <Text>{summary}</Text>
        </Box>
      </Box>
    </WrapItem>
  );
};

export const ItineraryCard = ({
  itinerary,
}: {
  itinerary: FindItineraryByIdObject;
}): ReactElement => {
  const history = useHistory();
  const { title, public_identifier } = itinerary;
  return (
    <WrapItem
      onClick={() => history.push(`${Paths.Itinerary}/${public_identifier}`)}
    >
      <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box background="rebeccapurple" height="75px" />
        <Box p="4">
          <Heading size="md">{title}</Heading>
        </Box>
      </Box>
    </WrapItem>
  );
};

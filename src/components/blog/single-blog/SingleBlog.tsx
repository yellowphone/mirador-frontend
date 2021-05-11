import React, { FC, useCallback } from 'react';
import {
  Container,
  Center,
  Heading,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleBlogDataProps } from './SingleBlog.types';
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { useHistory } from 'react-router';
import { Paths } from '../../../utils/paths';

export const SingleBlog: FC<SingleBlogDataProps> = ({
  data,
  renderElements,
}) => {
  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      console.log(data);
      history.push(
        path + '/' + data.findBlogByPublicIdentifier.public_identifier
      );
    },
    [history, data]
  );

  return (
    <>
      <NavigationBar />
      <Container maxW="lg" p={2}>
        <Button onClick={() => onNavigate(Paths.EditBlog)}>Edit Blog</Button>
        <VStack spacing="40px">
          <Center>
            <Heading>{data['findBlogByPublicIdentifier']['title']}</Heading>
          </Center>
          <Center>
            <Text
              style={{ textAlign: 'center' }}
              fontSize="md"
              as="em"
              color="gray.500"
            >
              {data['findBlogByPublicIdentifier']['summary']}
            </Text>
          </Center>
          <Center>
            <TagGrid tags={data['findBlogByPublicIdentifier']['blog_tags']} />
          </Center>
          <Center>
            <Text>
              lat: {data['findBlogByPublicIdentifier']['blog_locations']['lat']}
              , lng:{' '}
              {data['findBlogByPublicIdentifier']['blog_locations']['lng']}
            </Text>
          </Center>
          {renderElements()}
        </VStack>
      </Container>
    </>
  );
};

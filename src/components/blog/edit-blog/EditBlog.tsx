import React, { useState, useCallback } from 'react';
import {
  Container,
  SimpleGrid,
  Center,
  Heading,
  VStack,
  Text,
  Image,
  Box,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { TagGrid } from '../../shared/media/Tags/TagGrid';
import { useHistory } from 'react-router';
import { Paths } from '../../../utils/paths';
import { Upload } from '../../shared/upload/Upload';
import { ExperienceSearch } from '../../shared/search/ExperienceSearch';
import { useForm } from 'react-hook-form';

export const EditBlog = ({ data, renderElements, addElement }) => {
  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(
        path + '/' + data.findBlogByPublicIdentifier.public_identifier
      );
    },
    [history, data]
  );

  const [textButton, setTextButton] = useState(false);
  const [imageButton, setImageButton] = useState(false);
  const [experienceButton, setExperienceButton] = useState(false);

  const textOnClick = () => {
    setTextButton(true);
    setImageButton(false);
    setExperienceButton(false);
  };
  const imageOnClick = () => {
    setTextButton(false);
    setImageButton(true);
    setExperienceButton(false);
  };
  const experienceOnClick = () => {
    setTextButton(false);
    setImageButton(false);
    setExperienceButton(true);
  };

  const submitElement = (input: { type: string; content: string }) => {
    console.log(input);
    addElement(input['type'], input['content']);
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <NavigationBar />
      <Container maxW="lg" p={2}>
        <Button onClick={() => onNavigate(Paths.SingleBlog)}>View Blog</Button>
        <VStack spacing="40px" p={5}>
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

        <Box p={5}>
          <form onSubmit={handleSubmit(submitElement)}>
            <Center>
              <Button onClick={textOnClick}>Add text</Button>
              <Button onClick={imageOnClick}>Add image</Button>
              <Button onClick={experienceOnClick}>Add experience</Button>
            </Center>

            {textButton ? (
              <>
                <Input
                  style={{ visibility: 'hidden' }}
                  name="type"
                  defaultValue="text"
                  ref={register}
                />
                <Textarea
                  name="content"
                  placeholder="Type text here"
                  ref={register}
                />
                <Center>
                  <Button type="submit">Add</Button>
                </Center>
              </>
            ) : null}

            {imageButton ? (
              <>
                <Upload addContent={addElement} />
              </>
            ) : null}

            {experienceButton ? (
              <>
                <ExperienceSearch addContent={addElement} />
              </>
            ) : null}
          </form>
        </Box>
      </Container>
    </>
  );
};

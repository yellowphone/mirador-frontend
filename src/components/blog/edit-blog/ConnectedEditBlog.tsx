import { useMutation, useQuery } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Center, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { mongodbClient } from '../../../graphql/mongodbClient';
import {
  DELETE_ELEMENT_FROM_BLOG,
  INSERT_ELEMENT_INTO_BLOG,
} from '../../../graphql/mutations/mongodbMutation';
import { FIND_BLOG_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/blogQuery';
import { FIND_MONGODB_BLOG } from '../../../graphql/queries/mongodbQuery';
import { TSFixMe } from '../../../types/global';
import { Page404 } from '../../shared/404/404';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { ElementDataProps } from '../Blog.types';
import { EditBlog } from './EditBlog';

/**
 * TODO:
 * - add element
 * - swap element
 */

export const ConnectedEditBlog = () => {
  const [data, setData] = useState<TSFixMe>({});
  const [elements, setElements] = useState<ElementDataProps[]>([]);
  const [mongoid, setMongoid] = useState<string>('');

  const location = useLocation();

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_BLOG, {
    client: mongodbClient,
  });

  const [deleteElementMutation] = useMutation(DELETE_ELEMENT_FROM_BLOG, {
    client: mongodbClient,
  });

  useQuery(FIND_BLOG_BY_PUBLIC_IDENTIFIER, {
    variables: { public_identifier: location.pathname.split('/')[3] },
    onCompleted: data => {
      console.log(data);
      setData(data);
      setMongoid(data['findBlogByPublicIdentifier']['mongoid']);
    },
    onError: err => console.error(err),
    fetchPolicy: 'cache-and-network',
  });

  useQuery(FIND_MONGODB_BLOG, {
    variables: { id: mongoid },
    client: mongodbClient,
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setElements(data['findBlog']['content']);
    },
    onError: err => console.error(err),
  });

  const addElement = (type: string, content: string) => {
    // add json to state
    setElements(elements => [...elements, { type: type, content: content }]);

    // add json to mongodb
    const element = {
      type: type,
      content: content,
    };
    insertElement({
      variables: {
        id: mongoid,
        element: element,
      },
    });
  };

  const deleteElement = (index: number) => {
    const newElem = [...elements];
    newElem.splice(index, 1);
    setElements(newElem);

    deleteElementMutation({
      variables: {
        id: mongoid,
        index: index,
      },
    });
  };

  const renderElements = () => {
    return elements.map((element: ElementDataProps, index: number) => {
      switch (element['type']) {
        case 'image':
          return (
            <SimpleGrid key={index} columns={1}>
              <HStack spacing="7px">
                <Image src={element['content']} />
                <DeleteIcon onClick={() => deleteElement(index)} />
              </HStack>
            </SimpleGrid>
          );
        case 'text':
          return (
            <SimpleGrid key={index} columns={1}>
              <HStack spacing="7px">
                <Text>{element['content']}</Text>
                <DeleteIcon onClick={() => deleteElement(index)} />
              </HStack>
            </SimpleGrid>
          );
        case 'experience':
          return (
            <SimpleGrid key={index} columns={1}>
              <HStack spacing="7px">
                <Center>
                  <BlogExperienceCard public_identifier={element['content']} />
                </Center>
                <DeleteIcon onClick={() => deleteElement(index)} />
              </HStack>
            </SimpleGrid>
          );
      }
    });
  };

  return (
    <>
      {!data['findBlogByPublicIdentifier'] && <Page404 />}
      {data['findBlogByPublicIdentifier'] && (
        <EditBlog
          data={data}
          renderElements={renderElements}
          addElement={addElement}
        />
      )}
    </>
  );
};

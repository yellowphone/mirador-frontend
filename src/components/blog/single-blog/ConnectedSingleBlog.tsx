import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_BLOG_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/blogQuery';
import {
  Container,
  SimpleGrid,
  Center,
  Heading,
  VStack,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { SingleBlog } from './SingleBlog';
import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';
import { FIND_MONGODB_BLOG } from '../../../graphql/queries/mongodbQuery';
import { ElementDataProps } from '../Blog.types';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { TSFixMe } from '../../../types/global';

export const ConnectedSingleBlog = () => {
  // @TODO geo fix
  const [data, setData] = useState<TSFixMe>({});
  const [elements, setElements] = useState<ElementDataProps[]>([]);
  const [mongoid, setMongoid] = useState<string>('');

  const location = useLocation();

  useQuery(FIND_BLOG_BY_PUBLIC_IDENTIFIER, {
    fetchPolicy: 'cache-and-network',
    variables: { public_identifier: location.pathname.split('/')[2] },
    onCompleted: data => {
      console.log(data);
      setData(data);
      setMongoid(data['findBlogByPublicIdentifier']['mongoid']);
    },
    onError: err => console.error(err),
  });

  useQuery(FIND_MONGODB_BLOG, {
    variables: { id: mongoid },
    fetchPolicy: 'cache-and-network',
    client: mongodbClient,
    onCompleted: data => {
      console.log(data);
      setElements(data['findBlog']['content']);
      console.log(elements);
    },
    onError: err => console.error(err),
  });

  const renderElements = () => {
    return elements.map((element: ElementDataProps, index: number) => {
      switch (element['type']) {
        case 'image':
          return (
            <SimpleGrid key={index} columns={1}>
              <Image src={element['content']} />
            </SimpleGrid>
          );
        case 'text':
          return (
            <SimpleGrid key={index} columns={1}>
              <Text>{element['content']}</Text>
            </SimpleGrid>
          );
        case 'experience':
          return (
            <SimpleGrid key={index} columns={1}>
              <Center>
                <BlogExperienceCard public_identifier={element['content']} />
              </Center>
            </SimpleGrid>
          );
      }
    });
  };

  return (
    <>
      {!data['findBlogByPublicIdentifier'] && <Page404 />}
      {data['findBlogByPublicIdentifier'] && (
        <SingleBlog data={data} renderElements={renderElements} />
      )}
    </>
  );
};

import React from 'react';
import { useQuery } from '@apollo/client';
import { FIND_BLOG_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/blogQuery';
import { SimpleGrid, Center, Text, Image } from '@chakra-ui/react';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { SingleBlog } from './SingleBlog';
import { useLocation } from 'react-router-dom';
import { Page404 } from '../../shared/404/404';
import { TSFixMe } from '../../../types/global';

export const ConnectedSingleBlog = (): React.ReactNode => {
  const location = useLocation();

  const { data, loading, error } = useQuery(FIND_BLOG_BY_PUBLIC_IDENTIFIER, {
    variables: { public_identifier: location.pathname.split('/')[2] },
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  const renderBlogComponents = (type: string, content: TSFixMe) => {
    switch (type) {
      case 'image':
        return <Image src={content} />;
      case 'text':
        return <Text>{content}</Text>;
      case 'experience':
        return (
          <Center>
            <BlogExperienceCard public_identifier={content} />
          </Center>
        );
    }
  };

  console.log(data);

  const html: TSFixMe[] = [];
  data['findBlogByPublicIdentifier']['content']['content'].map(
    (elem: TSFixMe, index: number) => {
      console.log(elem);
      if (elem['type'] == 'two_col') {
        html.push(
          <SimpleGrid key={index} columns={2} spacing={5}>
            {renderBlogComponents(
              elem['col1']['type'],
              elem['col1']['content']
            )}
            {renderBlogComponents(
              elem['col2']['type'],
              elem['col2']['content']
            )}
          </SimpleGrid>
        );
      } else {
        html.push(
          <SimpleGrid key={index} columns={1}>
            {renderBlogComponents(elem['type'], elem['content'])}
          </SimpleGrid>
        );
      }
    }
  );

  return (
    <>
      {!data.findBlogByPublicIdentifier && <Page404 />}
      {data.findBlogByPublicIdentifier && (
        <SingleBlog data={data} html={html} />
      )}
    </>
  );
};

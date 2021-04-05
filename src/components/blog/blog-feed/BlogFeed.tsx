import { useQuery } from '@apollo/client';
import { Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { FIND_MANY_BLOGS } from '../../../graphql/queries/blogQuery';
import { BlogCard } from '../blog-card/BlogCard';
import { IBlog } from '../Blog.types';

export const BlogFeed = (): React.ReactElement => {
  const { data, loading, error } = useQuery(FIND_MANY_BLOGS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error!</h1>;
  }

  console.log(data);

  return (
    <>
      <Container maxW="xl" centerContent>
        <SimpleGrid columns={3} spacing={10}>
          {data['findManyBlogs'].map((item: IBlog, index: number) => {
            return <BlogCard blog={item} key={index} />;
          })}
        </SimpleGrid>
      </Container>
    </>
  );
};

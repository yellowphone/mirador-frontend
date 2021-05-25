import React from 'react';
import { Input, VStack, Center, Box } from '@chakra-ui/react';
import './Home.css';

export const Home = (): React.ReactElement => {
  return (
    <>
      <VStack>
        <Box className="exploreBar" width="50%">
          <Center>Let&apos;s Explore</Center>
          <Input placeholder={'Type a location to get started'} />
          {/* <SearchWithMap /> */}
        </Box>
      </VStack>
    </>
  );
};

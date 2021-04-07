import React from 'react';
import { NavigationBar } from '../shared/navigation-bar/NavigationBar';
import { Input, VStack, Center, Box } from '@chakra-ui/react';
import './Home.css';

export const Home = (): React.ReactElement => {
  return (
    <>
      <NavigationBar />
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
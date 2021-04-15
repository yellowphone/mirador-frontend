import React, { FC } from 'react';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { SingleItineraryProps } from './SingleItinerary.types';
import {
  Button,
  Image,
  Center,
  Input,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Box,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { ElementProps } from '../create-itinerary/CreateItinerary.types';

export const SingleItinerary: FC<SingleItineraryProps> = ({
  data,
  elements,
}) => {
  // render elements
  const renderElements = (date: string) => {
    return elements[date].map((element: ElementProps, index: number) => {
      console.log(element);
      switch (element['type']) {
        case 'experience':
          return (
            <>
              <Box maxW="sm" p="6" borderWidth="1px" borderRadius="lg">
                <HStack spacing="7px">
                  <Image
                    objectFit="cover"
                    height="150px"
                    width="50%"
                    src={element['content']['imgUrl']}
                  />
                  <Box>
                    <Heading>{element['content']['title']}</Heading>
                    <Text>
                      pkexperience: {element['content']['pkexperience']}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </>
          );

        case 'text':
          return (
            <>
              <Text>{element['content']}</Text>
            </>
          );
      }
    });
  };

  return (
    <>
      <NavigationBar />
      <p>Itinerary!!!</p>
      <p>pkitinerary: {data.pkitinerary}</p>
      <p>title: {data.title}</p>

      <Tabs isLazy>
        <TabList overflowX="scroll" maxWidth="100%" maxHeight="100%">
          {Object.keys(elements).map((key, index) => {
            return <Tab key={index}>{key}</Tab>;
          })}
        </TabList>
        <TabPanels>
          {Object.keys(elements).map((key, index) => {
            return (
              <TabPanel p={8} key={index}>
                {renderElements(key)}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </>
  );
};

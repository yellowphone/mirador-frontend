import React, { FC, useCallback } from 'react';
import { SingleTripProps } from './SingleTrip.types';
import {
  Button,
  Image,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { ElementProps } from '../create-trip/CreateTrip.types';
import { useHistory } from 'react-router';
import { Paths } from '../../../utils/paths';

export const SingleTrip: FC<SingleTripProps> = ({ data, elements }) => {
  const history = useHistory();

  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(`${path}/${data.public_identifier}`);
    },
    [history, data.public_identifier]
  );

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
      <p>Trip!!!</p>
      <p>pktrip: {data.pktrip}</p>
      <p>title: {data.title}</p>

      <Button onClick={() => onNavigate(Paths.EditTrip)}>Edit Trip</Button>

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

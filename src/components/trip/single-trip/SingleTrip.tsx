import React, { FC, useCallback, useState } from 'react';
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
import { DeleteIcon } from '@chakra-ui/icons';
import { DeleteDialog } from '../../shared/trip/DeleteDialog';
import { CheckPermissions } from '../../shared/trip/TripPermission';

export const SingleTrip: FC<SingleTripProps> = ({
  data,
  elements,
  mongoid,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const history = useHistory();

  const onNavigate = useCallback(
    (path: Paths, public_identifier: boolean) => {
      if (public_identifier) {
        history.push(`${path}/${data.public_identifier}`);
      } else {
        history.push(`${path}`);
      }
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

      {CheckPermissions(data.users) && (
        <>
          <DeleteDialog
            public_identifier={data.public_identifier}
            mongoId={mongoid}
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
          />

          <DeleteIcon onClick={() => setAlertOpen(true)} />

          <Button onClick={() => onNavigate(Paths.EditTrip, true)}>
            Edit Trip
          </Button>
        </>
      )}

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

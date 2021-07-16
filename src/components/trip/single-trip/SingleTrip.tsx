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
import { useMutation } from '@apollo/client';
import { DELETE_TRIP as DELETE_TRIP_MONGO } from '../../../graphql/mutations/mongodbMutation';
import { DELETE_TRIP } from '../../../graphql/mutations/tripMutation';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { DeleteIcon } from '@chakra-ui/icons';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

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

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    variables: {
      public_identifier: data.public_identifier,
    },
  });

  const [deleteTripMongo] = useMutation(DELETE_TRIP_MONGO, {
    client: mongodbClient,
    variables: {
      id: mongoid,
    },
  });

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

      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogContent>
          Are you sure you want to delete this trip?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: '#f44336' }}
            onClick={() => {
              deleteTripMongo();
              deleteTrip().then(() => {
                setAlertOpen(false);
                onNavigate(Paths.Trip, false);
              });
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setAlertOpen(false)} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteIcon onClick={() => setAlertOpen(true)} />

      <Button onClick={() => onNavigate(Paths.EditTrip, true)}>
        Edit Trip
      </Button>

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

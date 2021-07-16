import {
  Box,
  Button,
  Container,
  Image,
  Input,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Tbody,
  Tr,
  Td,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import React, { FC, useCallback, useState } from 'react';
import { Stars } from '../media/Stars/Stars';
import { CardDataProps } from './Card.types';

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
  ADD_EXPERIENCE_TO_TRIP,
  CREATE_TRIP,
} from '../../../graphql/mutations/tripMutation';
import { FIND_TRIPS_FOR_USER } from '../../../graphql/queries/tripQuery';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

export const Card: FC<CardDataProps> = ({ experience }) => {
  const {
    fk_experience_location,
    imageAlt,
    imageUrl,
    title,
    elevation,
    miles,
    rating,
    public_identifier,
  } = experience;

  const [cookie] = useCookies(['user']);

  const history = useHistory();
  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(path + '/' + public_identifier);
    },
    [history, public_identifier]
  );

  const [showCreateTrip, setShowCreateTrip] = useState(false);

  const [loadForCreateTrip, setLoadForCreateTrip] = useState(false);

  const [addExperienceToTrip] = useMutation(ADD_EXPERIENCE_TO_TRIP);

  const [createTrip] = useMutation(CREATE_TRIP);

  const [
    getUserTrips,
    {
      loading: loadingUserTrips,
      error: errorUserTrips,
      data: userTrips,
      refetch: userTripsRefetch,
    },
  ] = useLazyQuery(FIND_TRIPS_FOR_USER);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const onCreateTrip = (input: { title: string }) => {
    setLoadForCreateTrip(true);

    // creating postgresql trip instance with empty mongo id
    createTrip({
      variables: {
        title: input['title'],
        summary: '',
        mongoid: '',
        pkuser: cookie['user']['pkuser'],
      },
    })
      .then(() => {
        setLoadForCreateTrip(false);
        userTripsRefetch && userTripsRefetch();
        setShowCreateTrip(false);
      })
      .catch(error => {
        window.alert('Oh no! There was an error, check the console');
        console.log(error);
        return;
      });
  };

  return (
    <Container
      maxW="20em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <div onClick={() => onNavigate(Paths.SingleExperience)}>
        {imageUrl && (
          <Image
            objectFit="cover"
            height="200px"
            width="100%"
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
          />
        )}
        {!imageUrl && (
          <Image
            objectFit="cover"
            height="200px"
            width="100%"
            src="https://cdn-5fcbf5c4c1ac1a221c18568d.closte.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"
            alt="photo not found"
          />
        )}

        {/* TODO: FIX so it isn't just hiking, add many other fields */}

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {miles && miles.toFixed(2)} miles &bull; {elevation} feet
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
        </Box>
      </div>

      <Box p="4">
        <Box d="flex" mt="2" alignItems="center">
          <Stars rating={rating} />
          <Spacer />
          <Button
            colorScheme="teal"
            size="xs"
            onClick={() => {
              onOpen();
              getUserTrips({
                variables: {
                  pkuser: cookie['user']['pkuser'],
                },
              });
            }}
          >
            Save
          </Button>

          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setShowCreateTrip(false);
            }}
          >
            <ModalOverlay />
            <ModalContent styles={{ maxHeight: 500 }}>
              <ModalHeader>Save this experience to your trip</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {isOpen && loadingUserTrips && <p>Loading...</p>}
                {isOpen && errorUserTrips && <p>Error!</p>}
                {isOpen && userTrips && (
                  <Table>
                    <Tbody>
                      {userTrips['findUser']['trips'].map(
                        (item: { pktrip: number; title: string }) => {
                          return (
                            <Tr
                              key={item.pktrip}
                              onClick={() => {
                                addExperienceToTrip({
                                  variables: {
                                    pkexperience: fk_experience_location,
                                    pktrip: item.pktrip,
                                  },
                                });
                                onClose();
                              }}
                            >
                              <Td>{item.title}</Td>
                            </Tr>
                          );
                        }
                      )}
                      <Tr>
                        {!showCreateTrip && (
                          <Td onClick={() => setShowCreateTrip(true)}>
                            <AddIcon />
                            &nbsp;Create a new Trip
                          </Td>
                        )}
                        {showCreateTrip && (
                          <Td>
                            <form onSubmit={handleSubmit(onCreateTrip)}>
                              <Input
                                size="sm"
                                style={{ width: '75%' }}
                                name="title"
                                placeholder="Title of your trip"
                                ref={register}
                              />
                              &nbsp;
                              {!loadForCreateTrip && (
                                <Button size="sm" type="submit">
                                  <CheckIcon />
                                </Button>
                              )}
                              {loadForCreateTrip && (
                                <Button isLoading size="sm" type="submit">
                                  <CheckIcon />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                onClick={() => setShowCreateTrip(false)}
                              >
                                <CloseIcon />
                              </Button>
                            </form>
                          </Td>
                        )}
                      </Tr>
                    </Tbody>
                  </Table>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                    setShowCreateTrip(false);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Container>
  );
};

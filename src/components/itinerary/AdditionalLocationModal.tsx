import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import {
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Search } from '../shared/Google/Search';
import { useLocationContext } from '../../utils/context/LocationContext';

export const AdditionalLocationModal = (): ReactElement => {
  const [addAdditionalLocation, setAddAdditionalLocation] = useState(false);
  const { coords } = useLocationContext();

  useEffect(() => {
    setAddAdditionalLocation(false);
  }, [coords]);

  return (
    <>
      <Button
        colorScheme="blue"
        marginLeft={4}
        marginRight={4}
        onClick={() => {
          setAddAdditionalLocation(!addAdditionalLocation);
        }}
      >
        Add additional location
      </Button>
      <Modal
        isOpen={addAdditionalLocation}
        onClose={() => setAddAdditionalLocation(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add additional location to itinerary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="location" margin={2}>
              Additional location
            </FormLabel>
            <Search />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setAddAdditionalLocation(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

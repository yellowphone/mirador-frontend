import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';

export const NoLogin = (): React.ReactElement => {
  const history = useHistory();

  return (
    <>
      <Modal isOpen={true} onClose={() => ({})}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Uh no!</ModalHeader>
          <ModalBody>
            <Text p={3}>You&apos;re not logged in!</Text>
            <Button p={3} size="sm" onClick={() => history.push(Paths.Home)}>
              Click here to go home
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

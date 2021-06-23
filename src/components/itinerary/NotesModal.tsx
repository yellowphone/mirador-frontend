import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ChangeEvent, ReactElement, useState } from 'react';

export const NotesModal = ({
  addNote,
}: {
  addNote: (text: string) => void;
}): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <Button onClick={onOpen} size="xs">
        Add notes
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={text}
              onChange={handleInputChange}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                setText('');
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                addNote(text);
                setText('');
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

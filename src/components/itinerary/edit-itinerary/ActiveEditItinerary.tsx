import { useMutation } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Text,
  Image,
  Heading,
  Textarea,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { INSERT_ELEMENT_INTO_ITINERARY } from '../../../graphql/mutations/mongodbMutation';
import { spacer16, spacer8 } from '../../../utils/styles/constants';
import {
  ElementProps,
  ExperienceContentDataProps,
  ManyElementDataProps,
} from '../create-itinerary/CreateItinerary.types';

const ActiveItineraryWrapper = styled.div`
  overflow: hidden;
`;

const ItineraryInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: ${spacer8};
  text-transform: uppercase;
`;

const DayContainer = styled.div`
  display: flex;
  margin: ${spacer16};
  overflow-x: scroll;
  white-space: nowrap;
`;

const Day = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#E2E8F0' : 'white')};
  border-radius: ${spacer8};
  padding: ${spacer8};
  &:not(:last-child) {
    margin-right: ${spacer16};
  }
`;

const DayText = styled.p`
  font-weight: bold;
  font-size: 24px;
`;

const ItineraryDetails = styled.div`
  white-space: nowrap;
`;

const DragDropContainer = styled.div`
  height: 100vh;
  padding: 0 ${spacer16};
`;

const NotesContainer = styled.div`
  bottom: 0;
  padding: ${spacer16};
  position: fixed;
`;

export const ActiveEditItinerary = ({
  elements,
  mongoId,
  setElements,
}: {
  elements: ManyElementDataProps;
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
}): ReactElement => {
  const elementKeys = Object.keys(elements);
  const title = 'New Itinerary';
  const [cookie] = useCookies(['user']);
  const history = useHistory();
  const [text, setText] = useState('');
  const [openText, setOpenText] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState(Object.keys(elements)[0]);

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_ITINERARY, {
    client: mongodbClient,
  });

  // no onsubmit, just add elements

  const addElement = (
    type: string,
    content: ExperienceContentDataProps | string
  ) => {
    // making deep copies to avoid object extensible issue
    const newElem = { ...elements };
    const newInnerElem = [...newElem[selectedDay]];
    newInnerElem.push({ type: type, content: content });
    newElem[selectedDay] = newInnerElem;
    setElements(newElem);

    insertElement({
      variables: {
        id: mongoId,
        element: {
          type: type,
          content: content,
        },
        date: selectedDay,
      },
    });
  };

  const renderElements = () => {
    return elements[selectedDay].map((element: ElementProps, index: number) => {
      switch (element['type']) {
        case 'experience':
          const elem = element.content as ExperienceContentDataProps;
          return (
            <div key={`${elem.pkexperience}-${index}`}>
              <Box
                maxW="sm"
                p="6"
                borderWidth="1px"
                borderRadius="lg"
                marginBottom={2}
              >
                <HStack spacing="7px">
                  <Image
                    objectFit="cover"
                    height="150px"
                    width="50%"
                    src={elem.imgUrl}
                  />
                  <Box>
                    <Heading>{elem.title}</Heading>
                    <Text>pkexperience: {elem.pkexperience}</Text>
                  </Box>
                </HStack>
              </Box>
            </div>
          );

        case 'text':
          return (
            <div key={`${index}-text`}>
              <Text>{element.content}</Text>
            </div>
          );
      }
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = JSON.parse(e.dataTransfer.getData('element'));
    addElement('experience', draggedElement);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    const inputValue = e.target.value;
    setText(inputValue);
  };

  return (
    <ActiveItineraryWrapper>
      <Flex alignItems="center" justifyContent="space-between" margin={2}>
        <Heading margin={2}>Your trip</Heading>
      </Flex>
      <ItineraryInfoWrapper>
        <DayContainer>
          {elementKeys.map((date, index) => {
            return (
              <Day
                key={`${index}-${date}`}
                selected={date === selectedDay}
                onClick={() => setSelectedDay(date)}
              >
                <DayText>Day {index + 1}</DayText>
              </Day>
            );
          })}
        </DayContainer>
        <ItineraryDetails>
          <Text fontSize="xs">{title}</Text>
          <Text fontSize="xs">{`${elementKeys[0]} - ${
            elementKeys[elementKeys.length - 1]
          }`}</Text>
        </ItineraryDetails>
      </ItineraryInfoWrapper>
      <DragDropContainer
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDragDrop(e)}
      >
        {renderElements()}
      </DragDropContainer>
      <NotesContainer>
        <Button onClick={onOpen}>Add notes</Button>
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
                  addElement('text', text);
                  setText('');
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </NotesContainer>
    </ActiveItineraryWrapper>
  );
};

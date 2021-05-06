import { useMutation } from '@apollo/client';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
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
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { UPDATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import {
  DELETE_ELEMENT_FROM_ITINERARY,
  INSERT_ELEMENT_INTO_ITINERARY,
  SWAP_ELEMENTS_IN_ITINERARY,
} from '../../../graphql/mutations/mongodbMutation';
import { Paths } from '../../../utils/paths';
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
  public_identifier,
  title,
}: {
  elements: ManyElementDataProps;
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
  public_identifier: string;
  title: string;
}): ReactElement => {
  const elementKeys = Object.keys(elements);
  const [cookie] = useCookies(['user']);
  const history = useHistory();
  const [text, setText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState(Object.keys(elements)[0]);

  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(`${path}/${public_identifier}`);
    },
    [history, public_identifier]
  );

  const [updateTitle] = useMutation(UPDATE_ITINERARY);

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_ITINERARY, {
    client: mongodbClient,
  });

  const [swapElementsMutation] = useMutation(SWAP_ELEMENTS_IN_ITINERARY, {
    client: mongodbClient,
  });

  const [deleteElementMutation] = useMutation(DELETE_ELEMENT_FROM_ITINERARY, {
    client: mongodbClient,
  });

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

  const swapElements = (firstIndex: number, secondIndex: number) => {
    // swap in state
    const newElem = { ...elements };
    const newInnerElem = [...newElem[selectedDay]];
    const temp = newInnerElem[secondIndex];
    newInnerElem[secondIndex] = newInnerElem[firstIndex];
    newInnerElem[firstIndex] = temp;
    newElem[selectedDay] = newInnerElem;
    setElements(newElem);

    swapElementsMutation({
      variables: {
        id: mongoId,
        date: selectedDay,
        firstIndex: firstIndex,
        secondIndex: secondIndex,
      },
    });
  };

  const deleteElement = (index: number) => {
    const newElem = { ...elements };
    const newInnerElem = [...newElem[selectedDay]];
    newInnerElem.splice(index, 1);
    newElem[selectedDay] = newInnerElem;
    setElements(newElem);

    deleteElementMutation({
      variables: {
        id: mongoId,
        date: selectedDay,
        index: index,
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
                  <DeleteIcon
                    onClick={() => {
                      deleteElement(index);
                    }}
                  />
                </HStack>
              </Box>
            </div>
          );

        case 'text':
          return (
            <div key={`${index}-text`}>
              <HStack spacing="7px">
                <Text>{element.content}</Text>
                <DeleteIcon
                  onClick={() => {
                    deleteElement(index);
                  }}
                />
              </HStack>
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
      <Button onClick={() => onNavigate(Paths.SingleItinerary)}>
        View Itinerary
      </Button>
      <Flex alignItems="center" justifyContent="space-between" margin={2}>
        <Editable
          margin={2}
          fontSize={'2xl'}
          defaultValue={title}
          onSubmit={newTitle => {
            updateTitle({
              variables: {
                public_identifier: public_identifier,
                title: newTitle,
              },
            });
          }}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
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

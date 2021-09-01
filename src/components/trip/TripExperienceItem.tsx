import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ElementProps,
  ExperienceContentDataProps,
} from './create-trip/CreateTrip.types';

export const TripExperienceCard = ({
  deleteElement,
  element,
  index,
  draggableId,
}: {
  deleteElement: (index: number) => void;
  element: ElementProps;
  index: number;
  draggableId: string;
}): ReactElement => {
  const elem = element.content as ExperienceContentDataProps;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                </Box>
                <DeleteIcon
                  onClick={() => {
                    deleteElement(index);
                  }}
                />
              </HStack>
            </Box>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export const TripExperienceText = ({
  deleteElement,
  element,
  index,
  draggableId,
}: {
  deleteElement: (index: number) => void;
  element: ElementProps;
  index: number;
  draggableId: string;
}): ReactElement => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
        </div>
      )}
    </Draggable>
  );
};

import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useEditableControls,
  Text,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useHistory } from 'react-router';
import { LOCAL_STORAGE } from '../../utils/constants';
import { Paths } from '../../utils/paths';
import {
  ActiveItineraryWrapper,
  CTAContainer,
  Day,
  DayContainer,
  DayText,
  DragDropContainer,
  ItineraryDetails,
  ItineraryInfoWrapper,
} from './ActiveItinerary.style';
import { AdditionalLocationModal } from './AdditionalLocationModal';
import {
  ElementProps,
  ExperienceContentDataProps,
} from './create-itinerary/CreateItinerary.types';
import { ManyElementDataProps } from './edit-itinerary/EditItinerary.types';
import {
  ItineraryExperienceCard,
  ItineraryExperienceText,
} from './ItineraryExperienceItem';
import { NotesModal } from './NotesModal';

export enum ItineraryType {
  NEW = 'NEW',
  EDIT = 'EDIT',
}

export const BaseActiveItinerary = ({
  addExperience,
  addNote,
  createItinerary,
  dates,
  deleteItineraryItem,
  itineraryItems,
  resetItineraryItems,
  id,
  selectedDay,
  setSelectedDay,
  setTitle,
  swapItineraryItems,
  title,
  type,
  updateTitle,
}: {
  addExperience: (experience: ExperienceContentDataProps) => void;
  addNote: (text: string) => void;
  createItinerary?: () => void;
  dates: string[];
  deleteItineraryItem: (index: number) => void;
  id?: string;
  itineraryItems: ManyElementDataProps;
  resetItineraryItems?: () => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  setTitle?: (title: string) => void;
  swapItineraryItems: (firstIndex: number, secondIndex: number) => void;
  title: string;
  type: string;
  updateTitle?: (title: string) => void;
}): ReactElement => {
  const history = useHistory();
  const renderItineraryItems = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {(itineraryItems[selectedDay] || []).map(
                (element: ElementProps, index: number) => {
                  switch (element.type) {
                    case 'experience':
                      return (
                        <ItineraryExperienceCard
                          deleteElement={deleteItineraryItem}
                          element={element}
                          index={index}
                          key={`${
                            (element.content as ExperienceContentDataProps)
                              .pkexperience
                          }-${index}`}
                        />
                      );
                    case 'text':
                      return (
                        <ItineraryExperienceText
                          deleteElement={deleteItineraryItem}
                          element={element}
                          index={index}
                          key={`${element.content}-${index}`}
                        />
                      );
                  }
                }
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    swapItineraryItems(result.source.index, result.destination.index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = JSON.parse(e.dataTransfer.getData('element'));
    addExperience(draggedElement);
  };

  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();
    return !isEditing ? (
      <EditIcon marginLeft={2} w="4" height="4" {...getEditButtonProps()} />
    ) : null;
  };

  return (
    <ActiveItineraryWrapper>
      {type === ItineraryType.EDIT && (
        <Button onClick={() => history.push(`${Paths.SingleItinerary}/${id}`)}>
          Go back
        </Button>
      )}
      <Flex alignItems="center" justifyContent="space-between" margin={2}>
        <Flex alignItems="center">
          <Editable
            fontSize={'2xl'}
            fontWeight="bold"
            defaultValue={title}
            onChange={type === ItineraryType.NEW ? setTitle : undefined}
            onSubmit={type === ItineraryType.EDIT ? updateTitle : undefined}
          >
            <EditablePreview />
            <EditableInput />
            <EditableControls />
          </Editable>
        </Flex>
        {type === ItineraryType.NEW && (
          <Flex>
            <Button
              onClick={() => {
                if (
                  confirm(
                    'This will delete the current itinerary. Are you sure?'
                  )
                ) {
                  localStorage.removeItem(LOCAL_STORAGE.ITINERARY_RANGE);
                  localStorage.removeItem(LOCAL_STORAGE.COORDS);
                  if (resetItineraryItems) resetItineraryItems();
                }
              }}
              marginRight={2}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={createItinerary} colorScheme="blue">
              Create itinerary
            </Button>
          </Flex>
        )}
      </Flex>
      <ItineraryInfoWrapper>
        <DayContainer>
          {(dates || []).map((date, index) => (
            <Day
              key={`${index}-${date}`}
              onClick={() => setSelectedDay(date)}
              selected={date === selectedDay}
            >
              <DayText>Day {index + 1}</DayText>
            </Day>
          ))}
        </DayContainer>
        <ItineraryDetails>
          <Text fontSize="xs">
            {`${dates[0]} - ${dates[dates.length - 1]}`}
          </Text>
        </ItineraryDetails>
      </ItineraryInfoWrapper>
      <DragDropContainer
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDragDrop(e)}
      >
        {renderItineraryItems()}
      </DragDropContainer>
      <CTAContainer>
        <NotesModal addNote={addNote} />
        <AdditionalLocationModal />
      </CTAContainer>
    </ActiveItineraryWrapper>
  );
};

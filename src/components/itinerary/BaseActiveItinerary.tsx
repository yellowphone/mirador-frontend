import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useEditableControls,
  Text,
  Box,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useHistory } from 'react-router';
import { LOCAL_STORAGE } from '../../utils/constants';
import { formatSingleDate, formatWeekdayMonthDayYear } from '../../utils/date';
import { Paths } from '../../utils/paths';
import { grey0 } from '../../utils/styles/colors';
import { spacer16, spacer24 } from '../../utils/styles/constants';
import {
  ActiveItineraryWrapper,
  DragDropContainer,
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
import { BsThreeDots } from 'react-icons/bs';

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
  const hasDates = dates.length > 0;
  const startDate = hasDates ? dates[0] : undefined;
  const endDate = hasDates ? dates[dates.length - 1] : undefined;

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
      <Flex flexDir="column" position="sticky" top="0" minWidth="550px">
        <Box p={spacer24} backgroundColor={grey0}>
          <Flex alignItems="center" justifyContent="space-between">
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
            <Flex alignItems="center">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Settings"
                  icon={<Icon as={BsThreeDots} />}
                  variant="ghost"
                />
                <MenuList>
                  {type === ItineraryType.NEW && (
                    <MenuItem
                      onClick={() => {
                        if (
                          confirm(
                            'This will delete the current itinerary. Are you sure?'
                          )
                        ) {
                          localStorage.removeItem(
                            LOCAL_STORAGE.ITINERARY_RANGE
                          );
                          localStorage.removeItem(LOCAL_STORAGE.COORDS);
                          if (resetItineraryItems) resetItineraryItems();
                        }
                      }}
                    >
                      Cancel
                    </MenuItem>
                  )}
                  {type === ItineraryType.EDIT && (
                    <MenuItem
                      onClick={() =>
                        history.push(`${Paths.SingleItinerary}/${id}`)
                      }
                    >
                      Cancel edit
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
              {type === ItineraryType.NEW && (
                <Button
                  type="submit"
                  onClick={createItinerary}
                  colorScheme="blue"
                  size="xs"
                >
                  Create itinerary
                </Button>
              )}
            </Flex>
          </Flex>
          {startDate && endDate && (
            <Flex alignItems="center">
              <CalendarIcon mr="2" />
              <Text>
                {formatWeekdayMonthDayYear(startDate, endDate)} &bull;{' '}
                <Text as="span" fontStyle="italic">
                  {dates.length} days
                </Text>
              </Text>
            </Flex>
          )}
        </Box>
        <ItineraryInfoWrapper>
          <Select
            size="lg"
            value={selectedDay}
            onChange={event => {
              setSelectedDay(event.target.value);
            }}
          >
            {(dates || []).map((date, index) => (
              <option key={`${index}-${date}`} value={date}>
                {formatSingleDate(date)} - Day {index + 1}
              </option>
            ))}
          </Select>
        </ItineraryInfoWrapper>
        <Flex bg={grey0} p="0 24px 16px 24px">
          <NotesModal addNote={addNote} />
          <AdditionalLocationModal />
        </Flex>
      </Flex>
      <DragDropContainer
        onDragOver={e => handleDragOver(e)}
        onDrop={e => handleDragDrop(e)}
      >
        {renderItineraryItems()}
      </DragDropContainer>
    </ActiveItineraryWrapper>
  );
};

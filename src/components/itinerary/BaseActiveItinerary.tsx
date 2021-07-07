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
import React, { ReactElement, SetStateAction } from 'react';
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
import { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import { useMutation } from '@apollo/client';
import { UPDATE_ITINERARY_DATE } from '../../graphql/mutations/mongodbMutation';
import { useEffect } from 'react';
import { mongodbClient } from '../../graphql/mongodbClient';
import { Dispatch } from 'react';

export enum ItineraryType {
  NEW = 'NEW',
  EDIT = 'EDIT',
}

export const BaseActiveItinerary = ({
  addExperience,
  addNote,
  dates,
  deleteItineraryItem,
  itineraryItems,
  selectedDay,
  setSelectedDay,
  setTitle,
  swapItineraryItems,
  title,
  type,
  updateTitle,
  mongoId,
  setElements,
}: {
  addExperience: (experience: ExperienceContentDataProps) => void;
  addNote: (text: string) => void;
  dates: string[];
  deleteItineraryItem: (index: number) => void;
  itineraryItems: ManyElementDataProps;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  setTitle?: (title: string) => void;
  swapItineraryItems: (firstIndex: number, secondIndex: number) => void;
  title: string;
  type: string;
  updateTitle?: (title: string) => void;
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
}): ReactElement => {
  // const history = useHistory();
  const hasDates = dates.length > 0;
  const startDate = hasDates ? moment(dates[0], 'YYYY-MM-DD') : null;
  const endDate = hasDates
    ? moment(dates[dates.length - 1], 'YYYY-MM-DD')
    : null;
  const [startPickerDate, setStartPickerDate] = useState<moment.Moment | null>(
    startDate
  );
  const [endPickerDate, setEndPickerDate] = useState<moment.Moment | null>(
    endDate
  );
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const [updateItineraryDate] = useMutation(UPDATE_ITINERARY_DATE, {
    client: mongodbClient,
    onCompleted: data => {
      delete data.updateItineraryDate._id;
      setElements(data.updateItineraryDate);
    },
  });

  useEffect(() => {
    updateItineraryDate({
      variables: {
        id: mongoId,
        beginning: startPickerDate?.format('YYYY-MM-DD'),
        end: endPickerDate?.format('YYYY-MM-DD'),
      },
    });
  }, [startPickerDate, endPickerDate, updateItineraryDate, mongoId]);

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
          </Flex>
          {startPickerDate && endPickerDate && (
            <Flex alignItems="center">
              <CalendarIcon mr="2" />
              <Text>
                {formatWeekdayMonthDayYear(
                  startPickerDate.format(`YYYY-MM-DD`),
                  endPickerDate.format(`YYYY-MM-DD`)
                )}{' '}
                &bull;{' '}
                <Text as="span" fontStyle="italic">
                  {dates.length} days
                </Text>
              </Text>
            </Flex>
          )}
        </Box>

        <DateRangePicker
          startDate={startPickerDate}
          startDateId="startDateId"
          endDate={endPickerDate}
          endDateId="endDateId"
          onDatesChange={({
            startDate: startPickerDate,
            endDate: endPickerDate,
          }: {
            startDate: moment.Moment | null;
            endDate: moment.Moment | null;
          }) => {
            setStartPickerDate(startPickerDate);
            setEndPickerDate(endPickerDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput: FocusedInputShape | null) =>
            setFocusedInput(focusedInput)
          }
        />

        {startPickerDate && endPickerDate && (
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
        )}

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

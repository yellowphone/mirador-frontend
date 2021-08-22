import { CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useEditableControls,
  Text,
  Box,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { ReactElement, SetStateAction } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { formatSingleDate, formatWeekdayMonthDayYear } from '../../utils/date';
import { grey0 } from '../../utils/styles/colors';
import { spacer24 } from '../../utils/styles/constants';
import {
  ActiveTripWrapper,
  DragDropContainer,
  NoteWrapper,
  TripInfoWrapper,
  TripPlannerWrapper,
} from './ActiveTrip.style';
import { AdditionalLocationModal } from './AdditionalLocationModal';
import {
  ElementProps,
  ExperienceContentDataProps,
} from './create-trip/CreateTrip.types';
import { ManyElementDataProps } from './edit-trip/EditTrip.types';
import { TripExperienceCard, TripExperienceText } from './TripExperienceItem';
import { NotesModal } from './NotesModal';
import { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import { useMutation } from '@apollo/client';
import { UPDATE_TRIP_DATE } from '../../graphql/mutations/mongodbMutation';
import { useEffect } from 'react';
import { mongodbClient } from '../../graphql/mongodbClient';
import { Dispatch } from 'react';
import { DeleteDialog } from '../shared/trip/DeleteDialog';
import { TripNoteEditor } from './TripNoteEditor';

export enum TripType {
  NEW = 'NEW',
  EDIT = 'EDIT',
}

export const BaseActiveTrip = ({
  addExperience,
  addNote,
  dates,
  deleteTripItem,
  tripItems,
  tripNotes,
  selectedDay,
  setSelectedDay,
  swapTripItems,
  title,
  type,
  updateTitle,
  mongoId,
  setElements,
  setNotes,
  addElementNotes,
  public_identifier,
}: {
  addExperience: (experience: ExperienceContentDataProps) => void;
  addNote: (text: string) => void;
  dates: string[];
  deleteTripItem: (index: number) => void;
  tripItems: ManyElementDataProps;
  tripNotes: ElementProps[];
  selectedDay: string | undefined;
  setSelectedDay: (day: string | undefined) => void;
  swapTripItems: (firstIndex: number, secondIndex: number) => void;
  title: string;
  type: string;
  updateTitle?: (title: string) => void;
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
  setNotes: Dispatch<SetStateAction<ElementProps[]>>;
  addElementNotes: (text: string) => void;
  public_identifier: string;
}): ReactElement => {
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
  const [alertOpen, setAlertOpen] = useState(false);

  const [updateTripDate] = useMutation(UPDATE_TRIP_DATE, {
    client: mongodbClient,
    onCompleted: data => {
      setElements(data.updateTripDate.trip);
      setSelectedDay(undefined);
    },
  });

  useEffect(() => {
    if (startPickerDate && endPickerDate) {
      updateTripDate({
        variables: {
          id: mongoId,
          beginning: startPickerDate?.format('YYYY-MM-DD'),
          end: endPickerDate?.format('YYYY-MM-DD'),
        },
      });
    }
  }, [startPickerDate, endPickerDate, updateTripDate, mongoId]);

  const renderTripItems = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {((selectedDay && tripItems[selectedDay]) || []).map(
                (element: ElementProps, index: number) => {
                  switch (element.type) {
                    case 'experience':
                      return (
                        <TripExperienceCard
                          deleteElement={deleteTripItem}
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
                        <TripExperienceText
                          deleteElement={deleteTripItem}
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
    swapTripItems(result.source.index, result.destination.index);
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
    <>
      <ActiveTripWrapper
        overflow={!startPickerDate && !endPickerDate ? 'scroll' : ''}
      >
        <Flex flexDir="column" position="sticky" top="0" minWidth="550px">
          <Box p={spacer24} backgroundColor={grey0}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <Editable
                  fontSize={'2xl'}
                  fontWeight="bold"
                  defaultValue={title}
                  onChange={type === TripType.NEW ? updateTitle : undefined}
                  onSubmit={type === TripType.EDIT ? updateTitle : undefined}
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
                  {formatWeekdayMonthDayYear(startPickerDate, endPickerDate)}{' '}
                  &bull;{' '}
                  <Text as="span" fontStyle="italic">
                    {dates.length} days
                  </Text>
                </Text>
              </Flex>
            )}
            <DeleteDialog
              public_identifier={public_identifier}
              mongoId={mongoId}
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
            />

            <DeleteIcon onClick={() => setAlertOpen(true)} />
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
            isOutsideRange={() => false}
          />

          {!startPickerDate && !endPickerDate && (
            <>
              <Flex bg={grey0} p="0 24px 16px 24px">
                <NotesModal addNote={addElementNotes} />
                <AdditionalLocationModal />
              </Flex>
              <TripNoteEditor
                notes={tripNotes}
                setNotes={setNotes}
                mongoId={mongoId}
              />
            </>
          )}
          {startPickerDate && endPickerDate && (
            <>
              <NoteWrapper>
                <Flex bg={grey0} p="0 24px 16px 24px">
                  <NotesModal addNote={addElementNotes} />
                </Flex>
                <TripNoteEditor
                  notes={tripNotes}
                  setNotes={setNotes}
                  mongoId={mongoId}
                />
              </NoteWrapper>

              <TripPlannerWrapper>
                <TripInfoWrapper>
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
                </TripInfoWrapper>

                <Flex bg={grey0} p="0 24px 16px 24px">
                  <NotesModal addNote={addNote} />
                  <AdditionalLocationModal />
                </Flex>
                <DragDropContainer
                  onDragOver={e => handleDragOver(e)}
                  onDrop={e => handleDragDrop(e)}
                >
                  {renderTripItems()}
                </DragDropContainer>
              </TripPlannerWrapper>
            </>
          )}
        </Flex>
      </ActiveTripWrapper>
    </>
  );
};

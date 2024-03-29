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
import { useMutation } from '@apollo/client';
import {
  INSERT_NOTE_ELEMENT_INTO_TRIP,
  INSERT_TRIP_ELEMENT_INTO_NOTES,
  SWAP_ELEMENTS_IN_NOTES,
  UPDATE_TRIP_DATE,
} from '../../graphql/mutations/mongodbMutation';
import { useEffect } from 'react';
import { mongodbClient } from '../../graphql/mongodbClient';
import { Dispatch } from 'react';
import { DeleteDialog } from '../shared/trip/DeleteDialog';
import { TripNoteEditor } from './TripNoteEditor';
import { DatePicker } from '../DatePicker';

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
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [alertOpen, setAlertOpen] = useState(false);

  const [updateTripDate] = useMutation(UPDATE_TRIP_DATE, {
    client: mongodbClient,
    onCompleted: data => {
      setElements(data.updateTripDate.trip);
      setSelectedDay(undefined);
    },
  });

  const [swapElementsNotesMutation] = useMutation(SWAP_ELEMENTS_IN_NOTES, {
    client: mongodbClient,
  });

  const [insertNoteElementIntoTrip] = useMutation(
    INSERT_NOTE_ELEMENT_INTO_TRIP,
    {
      client: mongodbClient,
    }
  );

  const [insertTripElementIntoNotes] = useMutation(
    INSERT_TRIP_ELEMENT_INTO_NOTES,
    {
      client: mongodbClient,
    }
  );

  const swapElementsInNotes = (firstIndex: number, secondIndex: number) => {
    const notes = [...tripNotes];
    const [removed] = notes.splice(firstIndex, 1);
    notes.splice(secondIndex, 0, removed);
    setNotes(notes);

    swapElementsNotesMutation({
      variables: {
        id: mongoId,
        firstIndex: firstIndex,
        secondIndex: secondIndex,
      },
    });
  };

  const getItemStyle = (isDragging: boolean) => ({
    userSelect: 'none',
    padding: 5,
    background: isDragging ? 'lightgreen' : '',
  });

  useEffect(() => {
    if (startDate && endDate) {
      updateTripDate({
        variables: {
          id: mongoId,
          beginning: moment(startDate)?.format('YYYY-MM-DD'),
          end: moment(endDate)?.format('YYYY-MM-DD'),
        },
      });
    }
  }, [startDate, endDate, updateTripDate, mongoId]);

  useEffect(() => {
    if (!startDate && hasDates) {
      const date = new Date(dates[0] + 'T00:00:00');
      setStartDate(date);
    }
  }, [startDate, hasDates, dates]);

  useEffect(() => {
    if (!endDate && hasDates) {
      const date = new Date(dates[dates.length - 1] + 'T00:00:00');
      setEndDate(date);
    }
  }, [endDate, hasDates, dates]);

  const renderTripItems = () => {
    return (
      <Droppable droppableId="droppable-trip">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getItemStyle(snapshot.isDragging)}
          >
            {((selectedDay && tripItems[selectedDay]) || []).map(
              (element: ElementProps, index: number) => {
                switch (element.type) {
                  case 'experience':
                    return (
                      <TripExperienceCard
                        deleteElement={deleteTripItem}
                        element={element}
                        index={index}
                        draggableId={`trip-${index.toString()}`}
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
                        draggableId={`trip-${index.toString()}`}
                        key={`${element.content}-${index}`}
                      />
                    );
                }
              }
            )}
          </div>
        )}
      </Droppable>
    );
  };

  const onDragEnd = (result: DropResult) => {
    // insert elem array and delete other elem array using indexes
    console.log(result);
    if (!result.destination) return;

    // swapping items in trip
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.droppableId === 'droppable-trip'
    ) {
      swapTripItems(result.source.index, result.destination.index);
    }

    // swapping items in notes
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.droppableId === 'droppable-notes'
    ) {
      swapElementsInNotes(result.source.index, result.destination.index);
    }

    // moving note element to trips
    if (
      result.source.droppableId === 'droppable-notes' &&
      result.destination.droppableId === 'droppable-trip'
    ) {
      if (selectedDay) {
        const notes = [...tripNotes];
        const newElem = { ...tripItems };
        const newInnerElem = [...tripItems[selectedDay]];
        const [removed] = notes.splice(result.source.index, 1);
        newInnerElem.splice(result.destination.index, 0, removed);
        newElem[selectedDay] = newInnerElem;

        setNotes(notes);
        setElements(newElem);

        insertNoteElementIntoTrip({
          variables: {
            id: mongoId,
            noteIndex: result.source.index,
            tripIndex: result.destination.index,
            date: selectedDay,
          },
        });
      }
    }

    // moving trip element to notes
    if (
      result.source.droppableId === 'droppable-trip' &&
      result.destination.droppableId === 'droppable-notes'
    ) {
      if (selectedDay) {
        const notes = [...tripNotes];
        const newElem = { ...tripItems };
        const newInnerElem = [...tripItems[selectedDay]];
        const [removed] = newInnerElem.splice(result.source.index, 1);
        notes.splice(result.destination.index, 0, removed);
        newElem[selectedDay] = newInnerElem;

        setNotes(notes);
        setElements(newElem);

        insertTripElementIntoNotes({
          variables: {
            id: mongoId,
            noteIndex: result.destination.index,
            tripIndex: result.source.index,
            date: selectedDay,
          },
        });
      }
    }
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
      <ActiveTripWrapper overflow={!startDate && !endDate ? 'scroll' : ''}>
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
            <DeleteDialog
              public_identifier={public_identifier}
              mongoId={mongoId}
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
            />

            <DeleteIcon onClick={() => setAlertOpen(true)} />
          </Box>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <DragDropContext onDragEnd={onDragEnd}>
            {!startDate && !endDate && (
              <>
                <Flex bg={grey0} p="0 24px 16px 24px">
                  <NotesModal addNote={addElementNotes} />
                  <AdditionalLocationModal />
                </Flex>
                <TripNoteEditor
                  notes={tripNotes}
                  setNotes={setNotes}
                  mongoId={mongoId}
                  onDragEnd={onDragEnd}
                />
              </>
            )}
            {startDate && endDate && (
              <>
                <NoteWrapper>
                  <Flex bg={grey0} p="0 24px 16px 24px">
                    <NotesModal addNote={addElementNotes} />
                  </Flex>
                  <TripNoteEditor
                    notes={tripNotes}
                    setNotes={setNotes}
                    mongoId={mongoId}
                    onDragEnd={onDragEnd}
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
          </DragDropContext>
        </Flex>
      </ActiveTripWrapper>
    </>
  );
};

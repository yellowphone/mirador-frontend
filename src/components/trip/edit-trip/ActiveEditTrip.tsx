import { useMutation } from '@apollo/client';
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { UPDATE_TRIP } from '../../../graphql/mutations/tripMutation';
import {
  DELETE_ELEMENT_FROM_TRIP,
  INSERT_ELEMENT_INTO_NOTES,
  INSERT_ELEMENT_INTO_TRIP,
  SWAP_ELEMENTS_IN_TRIP,
} from '../../../graphql/mutations/mongodbMutation';
import { BaseActiveTrip } from '../BaseActiveTrip';
import {
  ExperienceContentDataProps,
  ManyElementDataProps,
} from '../create-trip/CreateTrip.types';
import { ElementProps } from './EditTrip.types';

export const ActiveEditTrip = ({
  elements,
  notes,
  mongoId,
  setElements,
  setNotes,
  public_identifier,
  title,
}: {
  elements: ManyElementDataProps;
  notes: ElementProps[];
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
  setNotes: Dispatch<SetStateAction<ElementProps[]>>;
  public_identifier: string;
  title: string;
}): ReactElement => {
  const elementKeys = Object.keys(elements);
  const [selectedDay, setSelectedDay] = useState<string | undefined>(
    elementKeys[0]
  );

  useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(elementKeys[0]);
    }
  }, [elementKeys, selectedDay]);

  const [updateTitle] = useMutation(UPDATE_TRIP);

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_TRIP, {
    client: mongodbClient,
  });

  const [swapElementsMutation] = useMutation(SWAP_ELEMENTS_IN_TRIP, {
    client: mongodbClient,
  });

  const [deleteElementMutation] = useMutation(DELETE_ELEMENT_FROM_TRIP, {
    client: mongodbClient,
  });

  const [insertElementNotesMutation] = useMutation(INSERT_ELEMENT_INTO_NOTES, {
    client: mongodbClient,
  });

  const addElement = (
    type: string,
    content: ExperienceContentDataProps | string
  ) => {
    if (selectedDay) {
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
    }
  };

  const addElementToNotes = (
    type: string,
    content: ExperienceContentDataProps | string
  ) => {
    const newElem = [...notes];
    newElem.push({ type: type, content: content });
    setNotes(newElem);

    insertElementNotesMutation({
      variables: {
        id: mongoId,
        element: {
          type: type,
          content: content,
        },
      },
    });
  };

  const swapElements = (firstIndex: number, secondIndex: number) => {
    if (selectedDay) {
      // swap in state
      const newElem = { ...elements };
      const newInnerElem = [...elements[selectedDay]];
      const [removed] = newInnerElem.splice(firstIndex, 1);
      newInnerElem.splice(secondIndex, 0, removed);
      newElem[selectedDay] = newInnerElem;
      setElements(newElem);

      swapElementsMutation({
        variables: {
          id: mongoId.toString(),
          date: selectedDay,
          firstIndex: firstIndex,
          secondIndex: secondIndex,
        },
      });
    }
  };

  const deleteElement = (index: number) => {
    if (selectedDay) {
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
    }
  };

  return (
    <BaseActiveTrip
      addExperience={experience => addElement('experience', experience)}
      addNote={text => addElement('text', text)}
      dates={elementKeys}
      deleteTripItem={index => deleteElement(index)}
      tripItems={elements}
      tripNotes={notes}
      selectedDay={selectedDay}
      setSelectedDay={day => setSelectedDay(day)}
      swapTripItems={(first, second) => swapElements(first, second)}
      title={title}
      mongoId={mongoId}
      type="EDIT"
      updateTitle={newTitle => {
        updateTitle({
          variables: {
            public_identifier: public_identifier,
            title: newTitle,
          },
        });
      }}
      setElements={setElements}
      setNotes={setNotes}
      addElementNotes={text => addElementToNotes('text', text)}
      public_identifier={public_identifier}
    />
  );
};

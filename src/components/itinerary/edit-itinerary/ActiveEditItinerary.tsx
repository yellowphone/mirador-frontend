import { useMutation } from '@apollo/client';
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { UPDATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import {
  DELETE_ELEMENT_FROM_ITINERARY,
  INSERT_ELEMENT_INTO_ITINERARY,
  SWAP_ELEMENTS_IN_ITINERARY,
} from '../../../graphql/mutations/mongodbMutation';
import { BaseActiveItinerary } from '../BaseActiveItinerary';
import {
  ExperienceContentDataProps,
  ManyElementDataProps,
} from '../create-itinerary/CreateItinerary.types';

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
  const [selectedDay, setSelectedDay] = useState<string | undefined>(
    elementKeys[0]
  );

  useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(elementKeys[0]);
    }
  }, [elementKeys, selectedDay]);

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
    <BaseActiveItinerary
      addExperience={experience => addElement('experience', experience)}
      addNote={text => addElement('text', text)}
      dates={elementKeys}
      deleteItineraryItem={index => deleteElement(index)}
      itineraryItems={elements}
      selectedDay={selectedDay}
      setSelectedDay={day => setSelectedDay(day)}
      swapItineraryItems={(first, second) => swapElements(first, second)}
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
    />
  );
};

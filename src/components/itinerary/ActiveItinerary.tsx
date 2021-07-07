import { useMutation } from '@apollo/client';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { mongodbClient } from '../../graphql/mongodbClient';
import {
  CREATE_ITINERARY,
  UPDATE_ITINERARY,
} from '../../graphql/mutations/itineraryMutation';
import {
  DELETE_ELEMENT_FROM_ITINERARY,
  INSERT_ELEMENT_INTO_ITINERARY,
  SWAP_ELEMENTS_IN_ITINERARY,
} from '../../graphql/mutations/mongodbMutation';
import { LOCAL_STORAGE } from '../../utils/constants';
import { Paths } from '../../utils/paths';
import { BaseActiveItinerary } from './BaseActiveItinerary';
import {
  ExperienceContentDataProps,
  ManyElementDataProps,
} from './create-itinerary/CreateItinerary.types';

export const ActiveItinerary = ({
  elements,
  mongoId,
  setElements,
  public_identifier,
}: {
  elements: ManyElementDataProps;
  mongoId: string;
  setElements: Dispatch<SetStateAction<ManyElementDataProps>>;
  public_identifier: string;
}): ReactElement => {
  const elementKeys = Object.keys(elements);
  const [title] = useState('My trip');

  const [selectedDay, setSelectedDay] = useState<string | undefined>(
    elementKeys[0]
  );

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_ITINERARY, {
    client: mongodbClient,
  });

  const [swapElementsMutation] = useMutation(SWAP_ELEMENTS_IN_ITINERARY, {
    client: mongodbClient,
  });

  const [deleteElementMutation] = useMutation(DELETE_ELEMENT_FROM_ITINERARY, {
    client: mongodbClient,
  });

  const [updateTitle] = useMutation(UPDATE_ITINERARY);

  useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(elementKeys[0]);
    }
  }, [elementKeys, selectedDay]);

  const addElement = (
    type: string,
    content: ExperienceContentDataProps | string
  ) => {
    if (selectedDay) {
      const newElem = { ...elements };
      newElem[selectedDay].push({ type: type, content: content });
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
      const [removed] = elements[selectedDay].splice(firstIndex, 1);
      elements[selectedDay].splice(secondIndex, 0, removed);
      setElements(elements);

      swapElementsMutation({
        variables: {
          id: mongoId,
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
      newElem[selectedDay].splice(index, 1);
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
      type="NEW"
      mongoId={mongoId}
      setElements={setElements}
      updateTitle={newTitle => {
        updateTitle({
          variables: {
            public_identifier: public_identifier,
            title: newTitle,
          },
        });
      }}
    />
  );
};

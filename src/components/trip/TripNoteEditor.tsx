import React, { Dispatch, SetStateAction, ReactElement } from 'react';
import {
  ElementProps,
  ExperienceContentDataProps,
} from './create-trip/CreateTrip.types';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { TripExperienceCard, TripExperienceText } from './TripExperienceItem';
import { useMutation } from '@apollo/client';
import {
  INSERT_ELEMENT_INTO_NOTES,
  SWAP_ELEMENTS_IN_NOTES,
  DELETE_ELEMENT_FROM_NOTES,
} from '../../graphql/mutations/mongodbMutation';
import { mongodbClient } from '../../graphql/mongodbClient';
import { DragDropContainer } from './ActiveTrip.style';

export const TripNoteEditor = ({
  notes,
  setNotes,
  mongoId,
  onDragEnd,
}: {
  notes: ElementProps[];
  setNotes: Dispatch<SetStateAction<ElementProps[]>>;
  mongoId: string;
  onDragEnd: (result: DropResult) => void;
}): ReactElement => {
  const [insertElementNotesMutation] = useMutation(INSERT_ELEMENT_INTO_NOTES, {
    client: mongodbClient,
  });

  const [deleteElementNotesMutation] = useMutation(DELETE_ELEMENT_FROM_NOTES, {
    client: mongodbClient,
  });

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

  const deleteElementFromNotes = (index: number) => {
    const newElem = [...notes];
    newElem.splice(index, 1);
    setNotes(newElem);

    deleteElementNotesMutation({
      variables: {
        id: mongoId,
        index: index,
      },
    });
  };

  const getItemStyle = (isDragging: boolean) => ({
    userSelect: 'none',
    padding: 5,
    background: isDragging ? 'lightgreen' : '',
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = JSON.parse(e.dataTransfer.getData('element'));
    addElementToNotes('experience', draggedElement);
  };

  const renderNoteItems = () => {
    return (
      <Droppable droppableId="droppable-notes">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getItemStyle(snapshot.isDragging)}
          >
            {(notes || []).map((element: ElementProps, index: number) => {
              switch (element.type) {
                case 'experience':
                  return (
                    <TripExperienceCard
                      deleteElement={index => deleteElementFromNotes(index)}
                      element={element}
                      index={index}
                      draggableId={`notes-${index.toString()}`}
                      key={`${
                        (element.content as ExperienceContentDataProps)
                          .pkexperience
                      }-${index}`}
                    />
                  );
                case 'text':
                  return (
                    <TripExperienceText
                      deleteElement={index => deleteElementFromNotes(index)}
                      element={element}
                      index={index}
                      draggableId={`notes-${index.toString()}`}
                      key={`${element.content}-${index}`}
                    />
                  );
              }
            })}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContainer
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDragDrop(e)}
    >
      {renderNoteItems()}
    </DragDropContainer>
  );
};

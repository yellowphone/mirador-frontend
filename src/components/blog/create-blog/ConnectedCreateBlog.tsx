import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';
import { Loader } from '@googlemaps/js-api-loader';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { Center, Text, Image, SimpleGrid, HStack } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';
import {
  CREATE_MONGODB_BLOG,
  DELETE_ELEMENT_FROM_BLOG,
  INSERT_ELEMENT_INTO_BLOG,
  SWAP_ELEMENTS_IN_BLOG,
} from '../../../graphql/mutations/mongodbMutation';
import { ElementDataProps } from '../Blog.types';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { Tag } from '../../shared/media/Tags/Tag.types';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { DeleteIcon } from '@chakra-ui/icons';

export const ConnectedCreateBlog = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [createCoords, setCreateCoords] = useState({ lat: 0, lng: 0 });

  const [mongoid, setMongoid] = useState('');

  const [addedTags, setAddedTags] = useState<Tag[]>([]);

  const [createBlog] = useMutation(CREATE_BLOG);

  const [createMongoBlog] = useMutation(CREATE_MONGODB_BLOG, {
    client: mongodbClient,
  });

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_BLOG, {
    client: mongodbClient,
  });

  const [swapElementsMutation] = useMutation(SWAP_ELEMENTS_IN_BLOG, {
    client: mongodbClient,
  });

  const [deleteElementMutation] = useMutation(DELETE_ELEMENT_FROM_BLOG, {
    client: mongodbClient,
  });

  const [elements, setElements] = useState<ElementDataProps[]>([]);

  const history = useHistory();

  useEffect(() => {
    createMongoBlog().then(data => {
      console.log(data);
      setMongoid(data.data['createBlog']);
    });
  }, [createMongoBlog]);

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const renderElements = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((element: ElementDataProps, index: number) => {
                switch (element['type']) {
                  case 'image':
                    return (
                      <Draggable draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleGrid key={index} columns={1}>
                              <HStack spacing="7px">
                                <Image src={element['content']} />
                                <DeleteIcon
                                  onClick={() => deleteElement(index)}
                                />
                              </HStack>
                            </SimpleGrid>
                          </div>
                        )}
                      </Draggable>
                    );
                  case 'text':
                    return (
                      <Draggable draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleGrid key={index} columns={1}>
                              <HStack spacing="7px">
                                <Text>{element['content']}</Text>
                                <DeleteIcon
                                  onClick={() => deleteElement(index)}
                                />
                              </HStack>
                            </SimpleGrid>
                          </div>
                        )}
                      </Draggable>
                    );
                  case 'experience':
                    return (
                      <Draggable draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleGrid key={index} columns={1}>
                              <HStack spacing="7px">
                                <Center>
                                  <BlogExperienceCard
                                    public_identifier={element['content']}
                                  />
                                </Center>
                                <DeleteIcon
                                  onClick={() => deleteElement(index)}
                                />
                              </HStack>
                            </SimpleGrid>
                          </div>
                        )}
                      </Draggable>
                    );
                }
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const addElement = (type: string, content: string) => {
    // add json to state
    setElements(elements => [...elements, { type: type, content: content }]);

    // add json to mongodb
    const element = {
      type: type,
      content: content,
    };
    insertElement({
      variables: {
        id: mongoid,
        element: element,
      },
    });
  };

  const swapElements = (firstIndex: number, secondIndex: number) => {
    const newElem = [...elements];
    const [removed] = newElem.splice(firstIndex, 1);
    newElem.splice(secondIndex, 0, removed);
    setElements(newElem);

    swapElementsMutation({
      variables: {
        id: mongoid,
        firstIndex: firstIndex,
        secondIndex: secondIndex,
      },
    });
  };

  const deleteElement = (index: number) => {
    const newElem = [...elements];
    newElem.splice(index, 1);
    setElements(newElem);

    deleteElementMutation({
      variables: {
        id: mongoid,
        index: index,
      },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    swapElements(result.source.index, result.destination.index);
  };

  const onSubmit = (input: { summary: string; title: string }) => {
    console.log(input);
    const tags: number[] = [];
    addedTags.map((item: Tag) => {
      tags.push(item.pktag);
    });

    createBlog({
      variables: {
        title: input['title'],
        summary: input['summary'],
        mongoid: mongoid,
        pkuser: cookie['user']['pkuser'],
        lat: createCoords['lat'],
        lng: createCoords['lng'],
        tags: tags,
      },
    }).then(data => {
      history.push(
        Paths.SingleBlog + '/' + data.data['createBlog']['public_identifier']
      );
    });
  };

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && (
        <CreateBlog
          onSubmit={onSubmit}
          addElement={addElement}
          renderElements={renderElements}
          setCreateCoords={setCreateCoords}
          loader={loader}
          setAddedTags={setAddedTags}
          addedTags={addedTags}
        />
      )}
    </>
  );
};

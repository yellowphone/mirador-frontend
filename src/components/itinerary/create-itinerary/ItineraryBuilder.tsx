import React, { useState, FC, FormEvent, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Image,
  Center,
  Input,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Box,
  HStack,
  Heading,
  Textarea,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { Paths } from '../../../utils/paths';
import {
  ElementProps,
  ExperienceContentDataProps,
  ItineraryBuilderProps,
  ManyElementDataProps,
} from './CreateItinerary.types';
import { useCookies } from 'react-cookie';
import {
  CREATE_MONGODB_ITINERARY,
  INSERT_ELEMENT_INTO_ITINERARY,
} from '../../../graphql/mutations/mongodbMutation';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { AddIcon } from '@chakra-ui/icons';

export const ItineraryBuilder: FC<ItineraryBuilderProps> = ({
  title,
  history,
}) => {
  const [cookie] = useCookies(['user']);

  const [elements, setElements] = useState<ManyElementDataProps>({});

  const [mongoid, setMongoid] = useState('');

  const [text, setText] = useState('');

  const [openText, setOpenText] = useState(false);

  const [createItinerary] = useMutation(CREATE_ITINERARY);

  const [createMongoItinerary] = useMutation(CREATE_MONGODB_ITINERARY, {
    client: mongodbClient,
  });

  const [insertElement] = useMutation(INSERT_ELEMENT_INTO_ITINERARY, {
    client: mongodbClient,
  });

  const { register, handleSubmit } = useForm();

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, date: string) => {
    const draggedElement = JSON.parse(e.dataTransfer.getData('element'));
    addElement('experience', draggedElement, date);
  };

  // Add helper for mongodb and json object
  const addElement = (
    type: string,
    content: ExperienceContentDataProps & string,
    date: string
  ) => {
    const newElem = { ...elements };
    newElem[date].push({ type: type, content: content });
    setElements(newElem);

    insertElement({
      variables: {
        id: mongoid,
        element: {
          type: type,
          content: content,
        },
        date: date,
      },
    });
  };

  // render elements
  const renderElements = (date: string) => {
    return elements[date].map((element: ElementProps, index: number) => {
      console.log(element);
      switch (element['type']) {
        case 'experience':
          return (
            <>
              <Box maxW="sm" p="6" borderWidth="1px" borderRadius="lg">
                <HStack spacing="7px">
                  <Image
                    objectFit="cover"
                    height="150px"
                    width="50%"
                    src={element['content']['imgUrl']}
                  />
                  <Box>
                    <Heading>{element['content']['title']}</Heading>
                    <Text>
                      pkexperience: {element['content']['pkexperience']}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </>
          );

        case 'text':
          return (
            <>
              <Text>{element['content']}</Text>
            </>
          );
      }
    });
  };

  // Itinerary creates
  const onItineraryCreate = (input: { start: string; end: string }) => {
    if (input['start'] <= input['end']) {
      createMongoItinerary({
        variables: {
          beginning: input['start'],
          end: input['end'],
        },
      }).then(data => {
        setMongoid(data.data.createItinerary._id);
        delete data.data.createItinerary._id;
        setElements(data.data.createItinerary);
      });
    } else {
      alert('Date range is not valid! Try again!');
    }
  };

  const onSubmit = () => {
    createItinerary({
      variables: {
        title: title,
        summary: '',
        mongoid: mongoid,
        pkuser: cookie['user']['pkuser'],
      },
    }).then(data => {
      console.log(data);
      const path = `${Paths.SingleItinerary}/${data.data['createItinerary']['public_identifier']}`;
      history.push(path);
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    const inputValue = e.target.value;
    setText(inputValue);
  };

  // Render
  if (Object.keys(elements).length == 0) {
    return (
      <form onSubmit={handleSubmit(onItineraryCreate)}>
        <Center>
          <Text>Please select your trip start and end date</Text>
        </Center>
        <Input type="date" name="start" ref={register} />
        <Input type="date" name="end" ref={register} />
        <Button type="submit">Submit</Button>
      </form>
    );
  } else {
    return (
      <>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit">Create Itinerary</Button>
          </form>
        </Center>
        <Tabs isLazy>
          <TabList overflowX="scroll" maxWidth="100%" maxHeight="100%">
            {Object.keys(elements).map((key, index) => {
              return <Tab key={index}>{key}</Tab>;
            })}
          </TabList>
          <TabPanels>
            {Object.keys(elements).map((key, index) => {
              return (
                <>
                  <TabPanel p={4} key={index}>
                    <Box w="50%">
                      <div
                        draggable
                        onDragOver={e => handleDragOver(e)}
                        onDrop={e => handleDragDrop(e, key)}
                        style={{
                          height: '75%',
                          width: '50%',
                          position: 'absolute',
                        }}
                      >
                        {renderElements(key)}
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setOpenText(prev => !prev);
                          }}
                        >
                          Add Notes
                          <AddIcon p={2} />
                        </Button>

                        {openText && (
                          <>
                            <Textarea
                              value={text}
                              onChange={handleInputChange}
                              placeholder="Here is a sample placeholder"
                              size="sm"
                            />
                            <Button
                              onClick={() => {
                                addElement('text', text, key);
                                setOpenText(false);
                                setText(text);
                              }}
                            >
                              Add to itinerary
                            </Button>
                          </>
                        )}
                      </div>
                    </Box>
                  </TabPanel>
                </>
              );
            })}
          </TabPanels>
        </Tabs>
      </>
    );
  }
};

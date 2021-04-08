import React, { useState, FC } from 'react';
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
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { Paths } from '../../../utils/paths';
import {
  ElementProps,
  ExperienceContentDataProps,
  ItineraryBuilderProps,
} from './CreateItinerary.types';
import { useCookies } from 'react-cookie';
import { TSFixMe } from '../../../types/global';
import {
  CREATE_MONGODB_ITINERARY,
  INSERT_ELEMENT_INTO_ITINERARY,
} from '../../../graphql/mutations/mongodbMutation';
import { mongodbClient } from '../../../graphql/mongodbClient';

export const ItineraryBuilder: FC<ItineraryBuilderProps> = ({
  title,
  history,
}) => {
  const [cookie] = useCookies(['user']);

  // this is confusing for me, elements will always
  // differ in type since it is a date range object
  // SO how would I create a type for a dynamic object?
  const [elements, setElements] = useState<TSFixMe>([]);

  const [mongoid, setMongoid] = useState('');

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
    content: ExperienceContentDataProps,
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
          /**
           * Data being passed in for experience is
           * - pkexperience
           * - title
           * - imgUrl (image link)
           * - imgAlt (alt for image)
           */

          return <h1>pkexperience: {element['content']['pkexperience']}</h1>;
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

  // Render
  if (elements.length == 0) {
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
                <TabPanel p={8} key={index}>
                  <div
                    onDragOver={e => handleDragOver(e)}
                    onDrop={e => handleDragDrop(e, key)}
                  >
                    {/* need to allow div to allow dragged-in content */}
                    <h1>hello</h1>
                    {renderElements(key)}
                  </div>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </>
    );
  }
};

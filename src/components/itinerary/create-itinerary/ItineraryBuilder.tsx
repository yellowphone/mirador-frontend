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
import { ItineraryBuilderProps } from './CreateItinerary.types';
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

  const [elements, setElements] = useState<TSFixMe[]>([]);

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
    // console.log(e.dataTransfer.getData('element'))
    const draggedElement = JSON.parse(e.dataTransfer.getData('element'));
    // console.log(draggedElement)
    addElement('experience', draggedElement, date);
  };

  // Add helper for mongodb and json object
  const addElement = (type: string, content: TSFixMe, date: string) => {
    setElements({
      ...elements,
      [date]: elements[date].push({ type: type, content: content }),
    });

    console.log(elements);

    const element = {
      type: type,
      content: content,
    };

    insertElement({
      variables: {
        id: mongoid,
        element: element,
        date: date,
      },
    });
  };

  // render elements
  const renderElements = (date: string) => {
    // console.log(date)
    // var innerElement = elements[date]
    // console.log(innerElement)
    // if (Array.isArray(innerElement)) {
    //   return innerElement.map((element: TSFixMe, index: number) => {
    //     // console.log(element)
    //     switch(element["type"]) {
    //       case "experience":
    //         return <h1>pkexperience: {element["content"]["pkexperience"]}</h1>
    //     }
    //   })
    // }
    // return Object.keys(elements).map((key, index) => {
    //   var element = elements["key"]
    //   console.log(element)
    //   switch(element["type"]) {
    //     case "experience":
    //       return <h1>pkexperience: {element["content"]["pkexperience"]}</h1>
    //   }
    // })
    // // return elements.map((element: TSFixMe, index: number) => {
    // //   switch(element["type"]) {
    // //     case "experience":
    // //       return <h1>pkexperience: {element["content"]["pkexperience"]}</h1>
    // //   }
    // // })
  };

  // Itinerary creates
  const onItineraryCreate = (input: TSFixMe) => {
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

  // if (obj.length == 0) {
  //   return (
  //     <>
  //       <Center>
  //         <form onSubmit={handleSubmit(onItineraryCreate)}>
  //           <Center>
  //             <Text>Please select your trip start and end date</Text>
  //           </Center>
  //           <Input type="date" name="start" ref={register} />
  //           <Input type="date" name="end" ref={register} />
  //           <Button type="submit">Submit</Button>
  //         </form>
  //       </Center>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Accordion allowToggle>
  //         <Center>
  //           <Heading>Your Trip</Heading>
  //         </Center>
  //         <Center>
  //           <form onSubmit={handleSubmit(onSubmit)}>
  //             <Button type="submit">Create Itinerary</Button>
  //           </form>
  //         </Center>
  //         <br></br>

  //         {obj.map((item: TSFixMe, index: number) => {
  //           return (
  //             <AccordionItem key={index}>
  //               <AccordionButton>
  //                 <Box flex="1" textAlign="left">
  //                   {item['date']}
  //                 </Box>
  //               </AccordionButton>
  //               <div
  //                 // Not sure what pb was used for, but it's an invalid div property
  //                 // so we have to comment it out for now. could break something!!!
  //                 // pb={4}
  //                 onDragOver={e => handleDragOver(e)}
  //                 onDrop={e => handleDragDrop(e, item['date'])}
  //               >
  //                 <AccordionPanel>
  //                   {
  //                     // Might need to render with {} in array, so it knows what kind of type it is
  //                     item.content.map((innerItems: string, index: number) => {
  //                       const innerItineraryElement = JSON.parse(innerItems);
  //                       return (
  //                         <Box
  //                           borderWidth="1px"
  //                           borderRadius="lg"
  //                           maxW="sm"
  //                           key={index}
  //                         >
  //                           <Image
  //                             src={innerItineraryElement.imgUrl}
  //                             alt={innerItineraryElement.imgAlt}
  //                             htmlWidth="50%"
  //                           />
  //                           <Box
  //                             mt="1"
  //                             fontWeight="semibold"
  //                             as="h4"
  //                             lineHeight="tight"
  //                           >
  //                             {innerItineraryElement.title}
  //                           </Box>
  //                         </Box>
  //                       );
  //                     })
  //                   }
  //                 </AccordionPanel>
  //               </div>
  //             </AccordionItem>
  //           );
  //         })}
  //       </Accordion>
  //     </>
  //   );
  // }
};

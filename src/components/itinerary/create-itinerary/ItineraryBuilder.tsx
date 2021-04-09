import React, { useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Center,
  Input,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { Paths } from '../../../utils/paths';
import { useCookies } from 'react-cookie';
// @TODO: Geo! Fix these types.
import { TSFixMe } from '../../../types/global';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';

const ItineraryBuilderWrapper = styled.article`
  margin: ${spacer16};
`;

const InputWrapper = styled.div`
  margin-bottom: ${spacer16};
`;

export const ItineraryBuilder: FC = () => {
  const history = useHistory();
  const [cookie] = useCookies(['user']);

  const [obj, setObj] = useState<TSFixMe[]>([]);

  const [createItinerary] = useMutation(CREATE_ITINERARY);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const { register, handleSubmit } = useForm();

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, date: string) => {
    const index = obj.findIndex(element => element.date == date);
    const newObj = [...obj];
    // add css for experience card
    newObj[index].content.push(e.dataTransfer.getData('element'));
    setObj(newObj);
  };

  const onItineraryCreate = (input: TSFixMe) => {
    if (input['start'] <= input['end']) {
      const start = new Date(input['start']);
      const end = new Date(input['end']);
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
      for (start; start <= end; start.setDate(start.getDate() + 1)) {
        const newDate = new Date(start);
        const month = ('0' + (newDate.getMonth() + 1).toString()).slice(-2),
          day = ('0' + newDate.getDate().toString()).slice(-2),
          year = newDate.getFullYear().toString();
        setObj(obj => [
          ...obj,
          { date: `${month}/${day}/${year}`, content: [] },
        ]);
      }
    } else {
      alert('Date range is not valid! Try again!');
    }
    console.log(input);
  };

  const onSubmit = () => {
    createItinerary({
      variables: {
        title: 'New Itinerary',
        summary: '',
        content: {
          content: obj,
        },
        pkuser: cookie['user']['pkuser'],
      },
    }).then(data => {
      console.log(data);
      const path = `${Paths.SingleItinerary}/${data.data['createItinerary']['public_identifier']}`;
      history.push(path);
    });
  };

  if (obj.length === 0) {
    return (
      <ItineraryBuilderWrapper>
        <Heading as="h1" size="lg" marginBottom={2}>
          Create a new itinerary
        </Heading>
        <Text fontSize="sm" marginBottom={4}>
          Here are some details describing what an itinerary is! Lorem ipsum
          dolor
        </Text>
        <form onSubmit={handleSubmit(onItineraryCreate)}>
          <InputWrapper>
            <FormLabel htmlFor="start-date">Trip start date</FormLabel>
            <Input id="start-date" type="date" name="start" ref={register} />
          </InputWrapper>
          <InputWrapper>
            <FormLabel htmlFor="end-date">Trip end date</FormLabel>
            <Input id="end-date" type="date" name="end" ref={register} />
          </InputWrapper>
          <Button type="submit">Submit</Button>
        </form>
      </ItineraryBuilderWrapper>
    );
  } else {
    return (
      <>
        <Accordion allowToggle>
          <Center>
            <Heading>Your Trip</Heading>
          </Center>
          <Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button type="submit">Create Itinerary</Button>
            </form>
          </Center>
          <br></br>

          {obj.map((item: TSFixMe, index: number) => {
            return (
              <AccordionItem key={index}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {item['date']}
                  </Box>
                </AccordionButton>
                <div
                  // Not sure what pb was used for, but it's an invalid div property
                  // so we have to comment it out for now. could break something!!!
                  // pb={4}
                  onDragOver={e => handleDragOver(e)}
                  onDrop={e => handleDragDrop(e, item['date'])}
                >
                  <AccordionPanel>
                    {
                      // Might need to render with {} in array, so it knows what kind of type it is
                      item.content.map((innerItems: string, index: number) => {
                        const innerItineraryElement = JSON.parse(innerItems);
                        return (
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            maxW="sm"
                            key={index}
                          >
                            <Image
                              src={innerItineraryElement.imgUrl}
                              alt={innerItineraryElement.imgAlt}
                              htmlWidth="50%"
                            />
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                            >
                              {innerItineraryElement.title}
                            </Box>
                          </Box>
                        );
                      })
                    }
                  </AccordionPanel>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </>
    );
  }
};

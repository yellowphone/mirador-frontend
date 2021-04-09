import {
  Heading,
  Accordion,
  Button,
  Flex,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Itinerary } from './ItineraryBuilder';
import { useCookies } from 'react-cookie';
import { useMutation } from '@apollo/client';
import { CREATE_ITINERARY } from '../../../graphql/mutations/itineraryMutation';
import { Paths } from '../../../utils/paths';
import styled from 'styled-components';
import { spacer16, spacer8 } from '../../../utils/styles/constants';

const ItineraryInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: ${spacer8};
  text-transform: uppercase;
`;

const DayContainer = styled.div`
  display: flex;
  margin: ${spacer16};
  overflow-x: scroll;
  white-space: nowrap;
`;

const Day = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#E2E8F0' : 'white')};
  border-radius: ${spacer8};
  padding: ${spacer8};
  &:not(:last-child) {
    margin-right: ${spacer16};
  }
`;

const DayText = styled.p`
  font-weight: bold;
  font-size: 24px;
`;

const ItineraryDetails = styled.div`
  white-space: nowrap;
`;

const DragDropContainer = styled.div`
  height: 100vh;
`;

export const ActiveItinerary = ({
  itineraries,
  setItineraries,
}: {
  itineraries: Itinerary[];
  setItineraries: Dispatch<SetStateAction<Itinerary[]>>;
}): React.ReactElement => {
  const title = 'New Itinerary';
  const [cookie] = useCookies(['user']);
  const { handleSubmit } = useForm();
  const history = useHistory();
  const [createItinerary] = useMutation(CREATE_ITINERARY);
  const [selectedDay, setSelectedDay] = useState(itineraries[0]);

  const onSubmit = () => {
    createItinerary({
      variables: {
        title,
        summary: '',
        content: {
          content: itineraries,
        },
        pkuser: cookie['user']['pkuser'],
      },
    }).then(data => {
      console.log(data);
      const path = `${Paths.SingleItinerary}/${data.data['createItinerary']['public_identifier']}`;
      history.push(path);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, date: string) => {
    const index = itineraries.findIndex(element => element.date === date);
    const newObj = [...itineraries];
    // add css for experience card
    newObj[index].content.push(e.dataTransfer.getData('element'));
    setItineraries(newObj);
  };

  return (
    <>
      <Accordion allowToggle>
        <Flex alignItems="center" justifyContent="space-between" margin={2}>
          <Heading margin={2}>Your trip</Heading>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Create itinerary
          </Button>
        </Flex>

        <ItineraryInfoWrapper>
          <DayContainer>
            {itineraries.map((itinerary: Itinerary, index: number) => {
              return (
                <Day
                  key={`${index}-${itinerary.date}`}
                  selected={itinerary.date === selectedDay.date}
                  onClick={() => setSelectedDay(itinerary)}
                >
                  <DayText>Day {index + 1}</DayText>
                </Day>
              );
            })}
          </DayContainer>
          <ItineraryDetails>
            <Text fontSize="xs">{title}</Text>
            <Text fontSize="xs">{`${itineraries[0].date} - ${
              itineraries[itineraries.length - 1].date
            }`}</Text>
          </ItineraryDetails>
        </ItineraryInfoWrapper>
        <DragDropContainer
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDragDrop(e, selectedDay.date)}
        >
          {/* Might need to render with {} in array, so it knows what kind of type it is */}
          {itineraries
            .find(itinerary => itinerary.date === selectedDay.date)
            ?.content.map((innerItems: string, index: number) => {
              const innerItineraryElement = JSON.parse(innerItems);
              return (
                <Box borderRadius="lg" key={index} margin={2}>
                  <Image
                    src={innerItineraryElement.imgUrl}
                    alt={innerItineraryElement.imgAlt}
                    htmlWidth="50%"
                  />
                  <Box mt="1" fontWeight="semibold" lineHeight="tight">
                    {innerItineraryElement.title}
                  </Box>
                </Box>
              );
            })}
        </DragDropContainer>
      </Accordion>
    </>
  );
};

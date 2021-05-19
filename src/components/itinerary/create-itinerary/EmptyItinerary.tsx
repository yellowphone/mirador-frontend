import { Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { Search } from '../../shared/Google/Search';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

const ItineraryBuilderWrapper = styled.article`
  margin: ${spacer16};
`;

const InputWrapper = styled.div`
  margin-bottom: ${spacer16};
`;

export const EmptyItinerary = ({
  onItineraryCreate,
}: {
  onItineraryCreate: (start: string, end: string) => void;
}): ReactElement => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<moment.Moment | null>(null);

  const { handleSubmit } = useForm();
  return (
    <ItineraryBuilderWrapper>
      <Heading as="h1" size="lg" marginBottom={2}>
        Create a new itinerary
      </Heading>
      <Text fontSize="sm" marginBottom={4}>
        Here are some details describing what an itinerary is! Lorem ipsum dolor
      </Text>
      <form
        onSubmit={handleSubmit(() => {
          const stringStartDate = moment(startDate).format('YYYY-MM-DD');
          const stringEndDate = moment(endDate).format('YYYY-MM-DD');
          onItineraryCreate(stringStartDate, stringEndDate);
        })}
      >
        <InputWrapper>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Search />
        </InputWrapper>

        <DateRangePicker
          startDate={startDate}
          startDateId="startDateId"
          endDate={endDate}
          endDateId="endDateId"
          onDatesChange={({
            startDate,
            endDate,
          }: {
            startDate: moment.Moment;
            endDate: moment.Moment;
          }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput: moment.Moment) =>
            setFocusedInput(focusedInput)
          }
        />

        <Button type="submit">Start new itinerary</Button>
      </form>
    </ItineraryBuilderWrapper>
  );
};

import { Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import { grey0 } from '../../../utils/styles/colors';

const TripBuilderWrapper = styled.article`
  background-color: ${grey0};
  padding: ${spacer16};
`;

const InputWrapper = styled.div`
  margin-bottom: ${spacer16};
`;

export const EmptyTrip = ({
  onTripCreate,
}: {
  onTripCreate: (start: string, end: string) => void;
}): ReactElement => {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const { handleSubmit } = useForm();
  return (
    <TripBuilderWrapper>
      <Heading as="h1" size="lg" marginBottom={2}>
        Create a new trip
      </Heading>
      <Text fontSize="sm" marginBottom={4}>
        Here are some details describing what an trip is! Lorem ipsum dolor
      </Text>
      <form
        onSubmit={handleSubmit(() => {
          const stringStartDate = moment(startDate).format('YYYY-MM-DD');
          const stringEndDate = moment(endDate).format('YYYY-MM-DD');
          onTripCreate(stringStartDate, stringEndDate);
        })}
      >
        <DateRangePicker
          startDate={startDate}
          startDateId="startDateId"
          endDate={endDate}
          endDateId="endDateId"
          onDatesChange={({
            startDate,
            endDate,
          }: {
            startDate: moment.Moment | null;
            endDate: moment.Moment | null;
          }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput: FocusedInputShape | null) =>
            setFocusedInput(focusedInput)
          }
        />

        <Button type="submit">Submit</Button>
      </form>
    </TripBuilderWrapper>
  );
};

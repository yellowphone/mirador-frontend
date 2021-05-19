import { Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { Search } from '../../shared/Google/Search';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TSFixMe } from '../../../types/global';

const ItineraryBuilderWrapper = styled.article`
  margin: ${spacer16};
`;

const InputWrapper = styled.div`
  margin-bottom: ${spacer16};
`;

export const EmptyItinerary = ({
  onItineraryCreate,
}: {
  onItineraryCreate: (input: { start: string; end: string }) => void;
}): ReactElement => {
  const { register, handleSubmit, control } = useForm();
  return (
    <ItineraryBuilderWrapper>
      <Heading as="h1" size="lg" marginBottom={2}>
        Create a new itinerary
      </Heading>
      <Text fontSize="sm" marginBottom={4}>
        Here are some details describing what an itinerary is! Lorem ipsum dolor
      </Text>
      <form onSubmit={handleSubmit(onItineraryCreate)}>
        <InputWrapper>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Search />
        </InputWrapper>

        <DatePicker
          className="input"
          selectsRange={true}
          onChange={update => update}
          // selected={props.value}
        />

        <label>React date picker</label>
        <Controller
          control={control}
          name="date"
          placeholderText="Select date"
          render={props => (
            <DatePicker
              className="input"
              selectsRange={true}
              onChange={update => update}
              selected={props.value}
            />
          )}
        />

        {/* <InputWrapper>
          <FormLabel htmlFor="start-date">Trip start date</FormLabel>
          <Input id="start-date" type="date" name="start" ref={register} />
        </InputWrapper>
        <InputWrapper>
          <FormLabel htmlFor="end-date">Trip end date</FormLabel>
          <Input id="end-date" type="date" name="end" ref={register} />
        </InputWrapper> */}
        <Button type="submit">Start new itinerary</Button>
      </form>
    </ItineraryBuilderWrapper>
  );
};

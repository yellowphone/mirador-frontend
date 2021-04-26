import { Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';

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
  const { register, handleSubmit } = useForm();
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
};

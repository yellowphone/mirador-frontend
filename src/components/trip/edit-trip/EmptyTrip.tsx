import { Button, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import React, { ReactElement, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { spacer16 } from '../../../utils/styles/constants';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';
import { grey0 } from '../../../utils/styles/colors';
import { DeleteIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { DELETE_TRIP } from '../../../graphql/mutations/tripMutation';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

const TripBuilderWrapper = styled.article`
  background-color: ${grey0};
  padding: ${spacer16};
`;

const InputWrapper = styled.div`
  margin-bottom: ${spacer16};
`;

export const EmptyTrip = ({
  onTripCreate,
  public_identifier,
}: {
  onTripCreate: (start: string, end: string) => void;
  public_identifier: string;
}): ReactElement => {
  const [alertOpen, setAlertOpen] = useState(false);

  const history = useHistory();

  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(path);
    },
    [history]
  );

  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const { handleSubmit } = useForm();
  const [deleteTrip] = useMutation(DELETE_TRIP, {
    variables: {
      public_identifier: public_identifier,
    },
  });
  return (
    <TripBuilderWrapper>
      <Heading as="h1" size="lg" marginBottom={2}>
        Create a new trip
      </Heading>
      <Text fontSize="sm" marginBottom={4}>
        Here are some details describing what an trip is! Lorem ipsum dolor
      </Text>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogContent>
          Are you sure you want to delete this trip?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            style={{ backgroundColor: '#f44336' }}
            onClick={() => {
              deleteTrip().then(() => {
                setAlertOpen(false);
                onNavigate(Paths.Trip);
              });
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setAlertOpen(false)} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteIcon onClick={() => setAlertOpen(true)} />
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

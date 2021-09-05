import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import { grey0 } from '../../utils/styles/colors';
import { spacer16, spacer4, spacer8 } from '../../utils/styles/constants';
import { DayPickerProps } from 'react-day-picker/types/Props';

const DatePickerWrapper = styled.div`
  background-color: ${grey0};

  .DayPickerInput input {
    border-radius: ${spacer8};
    padding: ${spacer4} ${spacer8};
    &::placeholder {
      color: #212529;
    }
  }
  .DayPicker-Day--today {
    color: var(--chakra-colors-blue-500);
  }
  .DayPicker-Week {
    line-height: ${spacer16};
  }
`;

export const DatePicker = ({
  endDate,
  setEndDate,
  setStartDate,
  startDate,
}: {
  endDate?: Date;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  startDate?: Date;
}): ReactElement => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const modifiers = { start: startDate, end: endDate };
  const dayPickerProps: DayPickerProps = {
    fromMonth: new Date(currentYear, currentMonth),
    modifiers,
    selectedDays: [startDate, { from: startDate, to: endDate }],
    showOutsideDays: true,
  };

  return (
    <DatePickerWrapper>
      <DayPickerInput
        value={startDate}
        placeholder="From"
        format="LL"
        onDayChange={day => setStartDate(day)}
        dayPickerProps={{
          ...dayPickerProps,
          ...(endDate && { disabledDays: { after: endDate } }),
        }}
      />{' '}
      —{' '}
      <DayPickerInput
        value={endDate}
        placeholder="To"
        format="LL"
        onDayChange={day => setEndDate(day)}
        dayPickerProps={{
          ...dayPickerProps,
          ...(startDate && { disabledDays: { before: startDate } }),
          fromMonth: startDate,
        }}
      />
    </DatePickerWrapper>
  );
};

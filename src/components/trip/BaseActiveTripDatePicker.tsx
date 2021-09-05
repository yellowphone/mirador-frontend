import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { formatWeekdayMonthDayYear } from '../../utils/date';
import { grey0 } from '../../utils/styles/colors';
import { spacer24 } from '../../utils/styles/constants';
import { DatePicker } from '../DatePicker';

export const BaseActiveTripDatePicker = ({
  dateCount,
  endDate,
  setEndDate,
  setStartDate,
  startDate,
}: {
  dateCount: number;
  endDate?: Date;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  startDate?: Date;
}): ReactElement => {
  return (
    <>
      <Flex
        alignItems="center"
        p={`0 ${spacer24} ${spacer24} ${spacer24}`}
        backgroundColor={grey0}
      >
        <CalendarIcon mr="2" />
        {startDate && endDate ? (
          <Text>
            {formatWeekdayMonthDayYear(startDate, endDate)} &bull;{' '}
            <Text as="span" fontStyle="italic">
              {dateCount} days
            </Text>
          </Text>
        ) : (
          <Flex flexDir="column">
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};

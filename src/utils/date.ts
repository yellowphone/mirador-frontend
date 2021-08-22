import moment from 'moment';

export const formatSingleDate = (date: string): string => {
  const momentDate = moment(date);
  const fullDateString = 'MM/DD/YY';
  return momentDate.format(fullDateString);
};

export const formatWeekdayMonthDayYear = (
  startDate: Date,
  endDate: Date
): string => {
  const start = moment(startDate);
  const end = moment(endDate);
  const fullDateString = 'dddd, MMMM Do YYYY';
  const startDateString =
    start.year() === end.year() ? 'dddd, MMMM Do' : fullDateString;
  const formattedStartDate = start.format(startDateString);
  const formattedEndDate = end.format(fullDateString);
  return `${formattedStartDate} - ${formattedEndDate}`;
};

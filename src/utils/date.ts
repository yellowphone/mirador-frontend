import moment from 'moment';

export const formatSingleDate = (date: string): string => {
  const momentDate = moment(date);
  const fullDateString = 'MM/DD/YY';
  return momentDate.format(fullDateString);
};

export const formatWeekdayMonthDayYear = (
  start: string,
  end: string
): string => {
  const startDate = moment(start);
  const endDate = moment(end);
  const fullDateString = 'dddd, MMMM Do YYYY';
  const startDateString =
    startDate.year() === endDate.year() ? 'dddd, MMMM Do' : fullDateString;
  const formattedStartDate = moment(startDate).format(startDateString);
  const formattedEndDate = moment(endDate).format(fullDateString);
  return `${formattedStartDate} - ${formattedEndDate}`;
};
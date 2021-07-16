import moment from 'moment';

export const formatSingleDate = (date: string): string => {
  const momentDate = moment(date);
  const fullDateString = 'MM/DD/YY';
  return momentDate.format(fullDateString);
};

export const formatWeekdayMonthDayYear = (
  startDate: moment.Moment,
  endDate: moment.Moment
): string => {
  const fullDateString = 'dddd, MMMM Do YYYY';
  const startDateString =
    startDate.year() === endDate.year() ? 'dddd, MMMM Do' : fullDateString;
  const formattedStartDate = moment(startDate).format(startDateString);
  const formattedEndDate = moment(endDate).format(fullDateString);
  return `${formattedStartDate} - ${formattedEndDate}`;
};

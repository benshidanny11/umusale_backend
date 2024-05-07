/* eslint-disable import/prefer-default-export */
export const getNextDate = (startDate, numberOfDays) => {
  const nextDate = new Date(startDate);
  nextDate.setDate(nextDate.getDate() + numberOfDays);
  return nextDate;
};

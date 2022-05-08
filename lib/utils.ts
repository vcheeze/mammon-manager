/**
 * Takes a date and strips the timezone from it.
 * @param date {Date} - Date to be converted
 * @returns New timezone-agonostic, UTC Date
 */
const getUTCDate = (date: Date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
// eslint-disable-next-line import/prefer-default-export
export { getUTCDate };

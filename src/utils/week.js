/* Calculates ISO week number for given date
 *
 * Algorithm is to find nearest thursday, it's year is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 * 
 * Also add specified amount of weeks to calculated week number. This calculation checks that
 * the final result doesn't exceed the maximum amount of weeks for given year.
 */
export const WeekNumber = (date, addWeeks) => {
  let d1 = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d1.setUTCDate(d1.getUTCDate() + 4 - (d1.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(d1.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil( ( ( (d1 - yearStart) / 86400000) + 1) / 7 );
  let result = weekNo;

  if (addWeeks || addWeeks > 0) {
    const d2 = new Date(d1.getFullYear(), 0, 1);
    const isLeap = new Date(d2.getFullYear(), 1, 29).getMonth() === 1;
    const weeksInAYear = d2.getDay() === 4 || isLeap && d2.getDay() === 3 ? 53 : 52

    if (weeksInAYear < (weekNo + addWeeks )) {
      result = (weekNo + addWeeks) - weeksInAYear;
    } else {
      result = weekNo + addWeeks;
    }
  }

  return result;
}

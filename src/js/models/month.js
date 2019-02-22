import { elements } from '../views/base';
import { ifTargetMatches } from '../models/Tasks';
import { changeWeek } from '../views/weekView';

import * as Week from './Week';

// generated weeks of the year
export const weeks = [];
// array with weekly tasks
export const weeklyTasks = [];


export const getWeeks = () => {
  const firstDayYear = new Date(Week.lastChoosedDay.getFullYear(), 0, 1);
  // console.log("firstDayYear",firstDayYear);

  // const sameYear = (element) => {
  //   return element.year == firstDayYear;
  // }
// console.log(weeks.some(elem => elem.year == String(firstDayYear)));
//   if (weeks == [] || weeks.some(elem => elem.year !== firstDayYear)) {
//     console.log("yeeeeeeeeeeeee");
    for (let i = 0; i<=51; i++) {
      let firstDay = Week.startOfWeek(new Date(firstDayYear.getTime() + 7 * i * 24 * 60 * 60 * 1000), 0);
      firstDay++;
      const newDay = new Date(firstDay);
      const first = newDay.toString().split(" ", 4);
      const last = new Date((newDay.getTime() + 6 * 24 * 60 * 60 * 1000)).toString().split(" ", 4);
      // console.log("last", last[3]);
      weeks.push({
        weekNr: i+1,
        firstDay: `${first[2]} ${first[1]}`, 
        lastDay: `${last[2]} ${last[1]}`,
        year: last[3]
      })
    }
  // console.table(weeks);
    return weeks;  
}

// Review:
// FIXME: WEEK SECTION SOMETIMES HAS 53WEEKS! MAX SHOULD BE 52 WEEKS AND IN JAN (MONTH SECTION) IN WEEK SECTION SCHOUD BE  WEEK NR 1

// generate all weeks numbers, theirs first and last day from the current year 
export const generateWeeks = () => {
  const currYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  // const firstDayYear = new Date(Week.lastChoosedDay.getFullYear(), 0, 1).toString().split(" ", 4)[3];
  // console.log("firstDayYear",firstDayYear);

  if (weeks.every(week => week.year !== currYear)) {
  // if (weeks[3].year !== Number(currYear)) {
    getWeeks()
    // console.log("yeeeeeeeeeee");
    // console.log("weeks[3].year", weeks[3].year);
    // console.log("Number(currYear)", Number(currYear));
    // console.log(weeks);
  } else {
    // console.log("weeks[3].year", weeks[3].year);
    // console.log("Number(currYear)", Number(currYear));
    
    return
  }
}


export const getMonthsWeeks = () => {
  let currentMonth = Week.lastChoosedDay.toString().split(" ", 2)[1];
  let currentYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  console.log("currentMonth",currentMonth);
  generateWeeks()
  let weeksOfCurrentYear = weeks.filter(week => week.year == currentYear);
  // console.log("weeksOfCurrentYear",weeksOfCurrentYear);
  let weeksOfCurrentMonth = weeksOfCurrentYear.filter(week => 
    week.firstDay.includes(currentMonth) && week.lastDay.includes(currentMonth) || 
    week.firstDay.includes(currentMonth) && week.lastDay.includes("Jan") || week.lastDay.includes(currentMonth)
    );
  console.log("weeksOfCurrentMonth",weeksOfCurrentMonth);
  return weeksOfCurrentMonth;
}


const changeMonth = (target) => {
  let lastChoosedMonth = Week.lastChoosedDay.getMonth();
  let lastChoosedYear = Week.lastChoosedDay.getFullYear();
  const isButtonPrevious = ifTargetMatches(target, ".button__previous--month");
  // if the target is a button nextMonth or previousMonth then add or subtract a month by 1 
  isButtonPrevious ? lastChoosedMonth-- : lastChoosedMonth++;
  let newDay = new Date(Week.lastChoosedDay.setFullYear(lastChoosedYear, lastChoosedMonth,1));
  changeWeek(newDay);
}

export const nextMonth = (e) => {
  changeMonth(e.target);
}

export const previousMonth = (e) => {
  changeMonth(e.target);
}


import { ifTargetMatches } from '../models/Tasks';
import { changeWeek } from '../views/weekView';

import * as Week from './Week';

// generated weeks of the year
export const weeks = [];
// array with weekly tasks
export const weeklyTasks = [];


export const getWeeks = () => {
  const firstDayYear = new Date(Week.lastChoosedDay.getFullYear(), 0, 1);
    for (let i = 0; i<=51; i++) {
      let firstDay = Week.startOfWeek(new Date(firstDayYear.getTime() + 7 * i * 24 * 60 * 60 * 1000), 0);
      firstDay++;
      const newDay = new Date(firstDay);
      const first = newDay.toString().split(" ", 4);
      const last = new Date((newDay.getTime() + 6 * 24 * 60 * 60 * 1000)).toString().split(" ", 4);
      weeks.push({
        weekNr: i+1,
        firstDay: `${first[2]} ${first[1]}`, 
        lastDay: `${last[2]} ${last[1]}`,
        year: last[3]
      })
    }
    return weeks;  
}


// generate all weeks numbers, theirs first and last day from the current year 
export const generateWeeks = () => {
  const currYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  if (weeks.every(week => week.year !== currYear)) {
    getWeeks();
  } else {
    return
  }
}


export const getMonthsWeeks = () => {
  let currentMonth = Week.lastChoosedDay.toString().split(" ", 2)[1];
  let currentYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  // console.log("currentMonth",currentMonth);
  generateWeeks()
  let weeksOfCurrentYear = weeks.filter(week => week.year == currentYear);
  let weeksOfCurrentMonth = weeksOfCurrentYear.filter(week => 
    week.firstDay.includes(currentMonth) && week.lastDay.includes(currentMonth) || 
    week.firstDay.includes(currentMonth) && week.lastDay.includes("Jan") && week.year.includes(Number(currentYear)+1) || 
    week.lastDay.includes(currentMonth)
    );
  // console.log("weeksOfCurrentMonth",weeksOfCurrentMonth);
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


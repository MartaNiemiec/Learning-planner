import { elements } from '../views/base';
import * as Week from './Week';


export const weeks = [];

// display mont name in the month section
export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = Week.months[monthNumber.getMonth()];
}

// generate all weeks numbers, theirs first and tast day from the current year 
export const generateWeeks = () => {
  const firstDayYear = new Date(Week.lastChosedDay.getFullYear(), 0, 1);
  // console.log(firstDayYear);
  for (let i = 0; i<=51; i++) {
    // console.log("todayDate", lastChosedDay);
    let firstDay = Week.startOfWeek(new Date(firstDayYear.getTime() + 7 * i * 24 * 60 * 60 * 1000), 0);
    // console.log("todayDate", firstDay.getMonth());
    firstDay++;
    const newDay = new Date(firstDay);
    const first = newDay.toString().split(" ", 4);
    const last = new Date((newDay.getTime() + 6 * 24 * 60 * 60 * 1000)).toString().split(" ", 4);
    // weeks.push(newDay.getDate());
    weeks.push({
      weekNr: i+1,
      firstDay: `${first[2]} ${first[1]}`, 
      lastDay: `${last[2]} ${last[1]}`
    })
  }
  return weeks;
}


export const getMonthsWeeks = () => {
  let currentMonth = Week.lastChosedDay.toString().split(" ", 2)[1];
  let weeksOfCurrentMonth = weeks.filter(week => week.firstDay.includes(currentMonth) || week.lastDay.includes(currentMonth));
  return weeksOfCurrentMonth;
}
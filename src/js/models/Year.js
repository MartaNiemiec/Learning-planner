import { elements } from '../views/base';
import * as yearView from '../views/yearView';
import * as Week from './Week';
import * as Month from './Month';
import * as weekView from '../views/weekView';
import * as Tasks from './Tasks';

// ===================================
// an array with month's names
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// ===================================
// an array with generated months from the specific year
const monthsArray = [];


// ===================================
// an array with monthly tasks in the year section
export const monthlyTasks = [];


// ===================================
//displaying current year i the title of the year section
export const displayCurrentYear = (lastChoosedDay) => {
  const lastChoosedYear = lastChoosedDay.getFullYear();
  elements.year.textContent = lastChoosedYear;
}


// ===================================
// generating months of the current year and pushing them into monthsArray
export const generateMonths = () => {
  const year = elements.year.textContent;
  for (let i = 0; i<=11; i++) {
    monthsArray.push({
      year: year,
      monthNumber: i,
      month: months[i]
    })
  }
  return monthsArray;
}


// ===================================
// checking if were generated months of the current year
const areMonthsGenerated = (currentYear) => {
  if(monthsArray.every(month => month.year !== currentYear)) {
    generateMonths();
    yearView.displayMonths();
  }
}


// ===================================
// getting months from the current year
export const getYearMonths = () => {
  let currentYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  let monthsOfCurrentYear = monthsArray.filter(month => month.year == currentYear);
  areMonthsGenerated(currentYear);
  return monthsOfCurrentYear;
}


// ===================================
//change year after clicking on the button next/previous in the year section
const changeYear = (target) => {
  let lastChoosedYear = Week.lastChoosedDay.getFullYear();
  // if the target is a button nextYear or previousYear then add or subtract a month by 1 
  const isButtonPrevious = Tasks.ifTargetMatches(target, ".button__previous--year");
  isButtonPrevious ? lastChoosedYear-- : lastChoosedYear++;
  let newDay = new Date(Week.lastChoosedDay.setFullYear(lastChoosedYear, 0,1));
  Month.generateWeeks()
  weekView.changeWeek(newDay);
}


// ===================================
// set the previous year in the year section
export const previousYear = (e) => {
  changeYear(e.target);
}


// ===================================
// set the next year in the year section
export const nextYear = (e) => {
  changeYear(e.target);
}








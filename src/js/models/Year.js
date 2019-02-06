import { elements } from '../views/base';
// import * as Week from './Week';
// import * as Month from './Month'

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthsArray = [];

export const displayCurrentYear = (lastChoosedDay) => {
  const lastChoosedYear = lastChoosedDay.getFullYear();
  elements.year.textContent = lastChoosedYear;
}

const generateMonths = () => {
  const year = elements.year.textContent;

  for (let i = 0; i<=11; i++) {
    monthsArray.push({
      year: year,
      monthNumber: i,
      month: months[i]
    })
  }
  console.log(monthsArray);
  return monthsArray;
}

generateMonths()









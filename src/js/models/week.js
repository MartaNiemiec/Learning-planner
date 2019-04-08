import { changeWeek } from '../views/weekView';


// DATE ON NAV
export let todayDate = new Date();
export let dayNr = todayDate.getDate();
export let month = todayDate.getMonth();
export let year = todayDate.getFullYear();
export let lastChoosedDay = todayDate;


// ===================================
// create an array with tasks
export let daysArray = [];


// ===================================
// change the new last choosed day
export const changeLastChoosedDay = (date) => {
  lastChoosedDay = date;
}


// ===================================
//GET CURRENT WEEK NUMBER
export const weekNr = dt => {
    var tdt = new Date(dt.valueOf());  // .valueOf returns a Number, representing the number of milliseconds between the date object and midnight January 1, 1970 UTCmiliseconds
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) 
      {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
      }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }
  // weekNr = new Date().getWeek();


// ===================================
//GET FIRST DAY OF THE CURRENT WEEK
export function startOfWeek(date, day) {  // does it work on Sunday???
    var first = date.getDate() - (date.getDay() - day) +(date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(first));
}
// (startOfWeek(new Date()).toString());


// ===================================
// go to next/previus week 
const firstDayOfWeek = (date, count) => {
  let firstDay = startOfWeek(new Date(date.getTime() - 7 * count * 24 * 60 * 60 * 1000), 1);
  lastChoosedDay = new Date(firstDay);
}

export const nextWeek = () => {
  firstDayOfWeek(lastChoosedDay, -1);
  changeWeek(lastChoosedDay);
}

export const previousWeek = () => {
  firstDayOfWeek(lastChoosedDay, 1);
  changeWeek(lastChoosedDay);
}


// ===================================
// GET DAYS OF THE CURRENT WEEK
export const getWeekDays = (date) => {
  //create an array with days in the week
  const weekDays = [];
  // weekDays = [{id: 0, day: "Mon 31 Dec"}, 
  //             {id: 1, day: "Tue 01 Jan"}, ...]

  // loop to get 7 days of the week
  for (let i = 0; i <= 6; i++) {
    const firstDay = startOfWeek(new Date(date), i).toString();
    const day = firstDay.split(" ", 4);
    // push every day to the weekDays array as an object
    weekDays.push({day: `${day[0]} ${day[2]} ${day[1]}`, date: `${day[2]} ${day[1]} ${day[3]}`});
    firstDay++;
  }
  return weekDays;
}

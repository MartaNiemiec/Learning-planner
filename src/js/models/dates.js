import { elements } from '../views/base';

// DATE ON HEADER
export let today = new Date();
export let day = today.getDate();
export let month = today.getMonth();
export let year = today.getFullYear();

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/*
==================================================
 WEEK section
==================================================
 */



/*
getDate()	Returns the day of the month (from 1-31)
getDay()	Returns the day of the week (from 0-6)
getFullYear()	Returns the year
getHours()	Returns the hour (from 0-23)
getMilliseconds()	Returns the milliseconds (from 0-999)
getMinutes()	Returns the minutes (from 0-59)
getMonth()	Returns the month (from 0-11)
getSeconds()	Returns the seconds (from 0-59)
*/


// ===================================
//get current week number 
 Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }
  
  // weekNumber = new Date().getWeek();


// ===================================
 // get days of the current week | display them
/*
==================================================
 GET FIRST/LAST DAY OF WEEK
==================================================
 */

export function startOfWeek(date)
  {
     
    var first = date.getDate() - (date.getDay() - 1) ;
    return new Date(date.setDate(first));
 
  }

// (startOfWeek(new Date()).toString());



export function dayOfCurrWeek(date, day)
  {
     
    var lastday = date.getDate() - (date.getDay() - 1) + day; // day of the month - (day of the week - 1) + 6 //eg. 4 - (5-1) + 6 = 6
    return new Date(date.setDate(lastday));
 
  }

// (dayOfCurrWeek(new Date()).toString());


export const getWeekDays = () => {
  //create an array with days in the week
  const weekDays = [];
  // weekDays = [{id: 0, day: "Mon 31 Dec"}, 
  //             {id: 1, day: "Tue 01 Jan"}, ...]

  // loop to get 7 days of the week
  for (let i = 0; i <= 6; i++) {
    const firstDay = dayOfCurrWeek(today, i).toString();
    const day = firstDay.split(" ", 3);

    // push every day to the weekDays array as an object
    weekDays.push({id: i, day: `${day[0]} ${day[2]} ${day[1]}`})  //return day as "Mon Dec 31 2018 23:09:09 GMT+0100"
    // weekDays.push({id: i, day: `${Date.parse(firstDay)}`}) // return day in miliseconds
    // weekDays.id = i;
    firstDay++;
  }
  return weekDays;
}

export const displayWeekDays = () => {
  getWeekDays().forEach(el => {
    // console.log(el);
    const markup = `<div class="section__item">
                    <h3 class="header-3 section__item--title"> 
                      <span class="week__day">${el.day}</span>
                      <button class="button button__add">
                        <i class="fas fa-plus-circle"></i>
                      </button>
                    </h3>
                    <h3 class="header-3 section__item--content"></h3>
                  </div>`;
    elements.weekDays.insertAdjacentHTML('beforeend', markup);
  });
}
























// ===================================
 // go to next/previus week | display changed week









// ===================================
 // add new task after clicking on the plus/add button | display it




// ===================================
 // toggle checked/unchecked task | display it

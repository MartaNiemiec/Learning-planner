import { elements } from '../views/base';

// DATE ON HEADER
export let todayDate = new Date();
export let dayNr = todayDate.getDate();
export let month = todayDate.getMonth();
export let year = todayDate.getFullYear();

console.log(todayDate);
console.log(dayNr);

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
//GET DURRENT WEEK NUMBER

//  Date.prototype.getWeek = function() {
//     var onejan = new Date(this.getFullYear(),0,1);
//     return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
//   }
  

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

export function startOfWeek(date, day) {  // doesn't work on Sunday
    var first = date.getDate() - (date.getDay() - day) +(date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(first));
}

// (startOfWeek(new Date()).toString());

// function dayOfCurrWeek(date, day) {
//   // day of the month - (day of the week - 1) + 6 //eg. 4 - (5-1) + 6 = 6
//   var d = date.getDate();
//   var dday = date.getDay();
//   var first =  d- ( dday - 1) + day; 
//   return new Date(date.setDate(first));
// }
// function startOfWeek(date, day) {
//     var first = date.getDate() - (date.getDay() - day) + (day === 0 ? -6 : 1);
  
//     return new Date(date.setDate(first));
 
//   }

// ===================================
 // GET DAYS OF THE CURRENT WEEK | display them
const getWeekDays = () => {
  //create an array with days in the week
  const weekDays = [];
  // weekDays = [{id: 0, day: "Mon 31 Dec"}, 
  //             {id: 1, day: "Tue 01 Jan"}, ...]

  // loop to get 7 days of the week
  for (let i = 0; i <= 6; i++) {
    const firstDay = startOfWeek(todayDate, i).toString();
    const day = firstDay.split(" ", 3);

    // push every day to the weekDays array as an object
    weekDays.push({id: i, day: `${day[0]} ${day[2]} ${day[1]}`});
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
                      <button class="button ">
                        <i class="fas fa-plus-circle button__add"></i>
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
// create an array with goals





// ===================================
 // add new task after clicking on the plus/add button | display it

export const addGoal = (e) => {
  const target = e.target;
  if (target.classList.contains("button__add")) {
    const markup = `<div class="section__item--goal">
                      <button class="button button__check">
                        <i class="far fa-circle"></i>
                      </button>
                      <input type="text" class="paragraph section__item--input" placeholder="text">
                      <button class="button ">
                        <i class="far fa-trash-alt button__delete"></i>
                      </button>
                    </div>`;
    // add 
    target.parentNode.parentNode.nextSibling.nextSibling.insertAdjacentHTML('beforeend', markup);;

    // console.log(target.parentNode.parentNode.nextSibling.nextSibling);
  }
}



// ===================================
 // remove goal | display it
export const deleteGoal = (e) => {
  const target = e.target;
  const dayContent = target.parentNode.parentNode;
  if (target.classList.contains("button__delete"))  {
    dayContent.remove(elements.sectionItemContent);
  }
  
}


// ===================================
 // toggle checked/unchecked task | display it

 export const toggleGoal = (e) => {
  const target = e.target;
  const checked = 'fa-check-circle';
  const unchecked = 'fa-circle';
  if (target.classList.contains(unchecked)) {
    target.classList.remove(unchecked);
    target.classList.add(checked);
  } else if (target.classList.contains(checked)) {
    target.classList.remove(checked);
    target.classList.add(unchecked);
  }
 }
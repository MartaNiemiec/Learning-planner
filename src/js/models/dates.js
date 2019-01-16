import { elements } from '../views/base';

// DATE ON HEADER
export let todayDate = new Date();
export let dayNr = todayDate.getDate();
export let month = todayDate.getMonth();
export let year = todayDate.getFullYear();

// console.log(todayDate);
// console.log(dayNr);

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
//GET CURRENT WEEK NUMBER

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



// ===================================
// create an array with goals

const days = [];

// create class Day 
class Day {
  constructor(date, task, checked) {
    this.date = date;
    this.tasks = [{task: task, check: checked}];
  }

}

















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
    const day = firstDay.split(" ", 4);
    // push every day to the weekDays array as an object
    weekDays.push({id: i, day: `${day[0]} ${day[2]} ${day[1]}`, date: `${day[2]} ${day[1]} ${day[3]}`});
    firstDay++;
  }
  return weekDays;
}

export const displayWeekDays = () => {
  getWeekDays().forEach(el => {
    // console.log(el);
    const markup = `<div class="section__item" data-date="${el.date}">
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
 // add new task after clicking on the plus/add button | display it

 export const hidePopupTask = () => {
  const popupTask = elements.popupTask;
  popupTask.classList.add("hide");
}



 
 export const addTask = (e) => {
   const target = e.target;
   console.log(target);
   if (target.classList.contains("button__add")) {
    const popupTask = elements.popupTask;

    popupTask.classList.remove("hide");

    //  const day = target.parentNode.parentNode.parentNode.dataset.date; // <div class="section__item--goal data-day="${day}">
    //  const task = target.parentNode.parentNode.nextSibling.nextSibling.firstChild; //input value
     
    //  // show task
    //  const markup = `<div class="section__item--goal">
    //                     <button class="button button__check">
    //                       <i class="far fa-circle"></i>
    //                     </button>
    //                     <input type="text" class="paragraph section__item--input" placeholder="text">
    //                     <button class="button ">
    //                       <i class="far fa-trash-alt button__delete"></i>
    //                     </button>
    //                   </div>`;
     
    //  // add 
    //  target.parentNode.parentNode.nextSibling.nextSibling.insertAdjacentHTML('beforeend', markup);
     
   
}



 // add task to the days array


 elements.weekDays.addEventListener('change' , (e) => {
  // const target = e.target;
  // const targetDay = e.target.parentNode.parentNode.parentNode.dataset.date;
  // // const day = target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].textContent;
  // let check = e.target.previousSibling.previousSibling.childNodes[1].classList.value;
console.log(e);
  console.log("target ->" + e.target);
  // console.log("day ->" + day);
  // console.log("check ->" + check);
  let task = e.target.value;
  console.log("task ->" + task);
  // console.log(targetDay);
  // console.log(day);

  // const day = new Day(targetDay, task, check)
  // console.log(day);
  
  // days.push(day);
  // console.log(days);
  // if (target.classList.contains("section__item--input") && target.classList.contains(day)) {
  // if (targetDay === day) {
    
    
  //   // console.log(day);
  //   // console.log(task);
  //   days.push({
  //                   date: day,
  //                   check: check,
  //                   task: task
  //                 })
  //   console.log(days);
  // }

  // if (days.length == 0) {
  //   days.push({
  //     date: day,
  //     check: check,
  //     task: task
  //   })
  // } else {
  //   days.forEach(el => {
  //     if (el.date !== day) {
  //       days.push({
  //         date: day,
  //         check: check,
  //         task: task
  //     })
  //   } 
  //   // else if (date == day && el.task == task)
  //   // console.log(object);
  // })
  // }

  
  // console.log("allTask" + days);
  // // console.log("allTask");
  
})
// console.log(task);
}

// ===================================
 // remove goal | display it
export const deleteTask = (e) => {
  const target = e.target;
  const dayContent = target.parentNode.parentNode;
  if (target.classList.contains("button__delete"))  {
    dayContent.remove(elements.sectionItemContent);
  }
  
}


// ===================================
 // toggle checked/unchecked task | display it

 export const toggleTask = (e) => {
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

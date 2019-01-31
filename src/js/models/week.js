import { elements } from '../views/base';
import * as Month from './Month'

// DATE ON HEADER
export let todayDate = new Date();
export let dayNr = todayDate.getDate();
export let month = todayDate.getMonth();
export let year = todayDate.getFullYear();
export let lastChoosedDay = todayDate;



export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
  
export const displayWeekNr = (date) => {
  elements.weekNumber.innerHTML = weekNr(date);
}


// ===================================
 //GET FIRST DAY OF THE CURRENT WEEK

export function startOfWeek(date, day) {  // does it work on Sunday???
    var first = date.getDate() - (date.getDay() - day) +(date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(first));
}

// (startOfWeek(new Date()).toString());


// ===================================
 // go to next/previus week | display changed week

export const nextWeek = () => {
  firstDayOfWeek(lastChoosedDay, -1);
  changeWeek(lastChoosedDay);
}

export const previousWeek = () => {
  firstDayOfWeek(lastChoosedDay, 1);
  changeWeek(lastChoosedDay);
}

const firstDayOfWeek = (date, count) => {
  let firstDay = startOfWeek(new Date(date.getTime() - 7 * count * 24 * 60 * 60 * 1000), 1);
  lastChoosedDay = new Date(firstDay);
}

export const changeWeek = (date) => {
  getWeekDays(date);
  displayWeekDays(date);
  weekNr(date);
  displayWeekNr(date);
  Month.getMonthsWeeks();
  Month.displayWeeks()
}


// ===================================
// GET DAYS OF THE CURRENT WEEK | display them

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

export const displayWeekDays = (date) => {
  elements.weekDays.innerHTML = "";
  getWeekDays(date).forEach(el => {
    const markup = `<div class="section__item" data-date="${el.date}">
                    <h3 class="header-3 section__item--title"> 
                      <span class="week__day">${el.day}</span>
                      <button class="button ">
                        <i class="fas fa-plus-circle button__add button__add--week"></i>
                      </button>
                    </h3>
                    <h3 class="header-3 section__item--content"></h3>
                  </div>`;
    elements.weekDays.insertAdjacentHTML('beforeend', markup);

    // find weekDay in the daysArray
    const dayArray = daysArray.find(day => day.date == el.date);
    // check is there any day object of the burrent weekDay
    if (dayArray) {
      // display tasks from the current weekDay
      displayDaysTasks(el.date)
    } 
  });
  displayWeekNr(lastChoosedDay);
  Month.displayMonth(lastChoosedDay);
}





// ===================================
// create an array with tasks
const daysArray = [];

// create class Day 
class Day {
  constructor(date, task, done = false) {
    this.date = date;
    this.tasks = [{task: task, done: done}];
  }

  addTask(task, done = false) {
    this.tasks.push({task: task, done: done});
  }

  updateTask(task, newTask) {
    // find the task to edit
    const taskToEdit = this.tasks.find(el => el.task == task);
    // change it to a new task
    taskToEdit.task = newTask;
  }

  toggleChecked(task) {
    const taskToToggle = this.tasks.find(el => el.task == task);
    // toggle "done" value to true/false
    taskToToggle.done = !taskToToggle.done;
  }

  deleteTask(task) {
    const taskToDeleteIndex = this.tasks.findIndex(el => el.task == task);
    this.tasks.splice(taskToDeleteIndex,1);
  }
}


// ===================================
 // add new task after clicking on the plus/add button | display it

 export const hidePopupTask = () => {
  const popupTask = elements.popupTask;
  popupTask.classList.add("hide");
  popupTask.removeAttribute('data-date');
  popupTask.removeAttribute('data-action');
}

 export const isButtonAdd = (e) => {
  const target = e.target;
  let date;
  let section;

  if (!target.matches(".button__add")) return;

  if (target.matches(".button__add--week")) {
    date = e.target.parentNode.parentNode.parentNode.dataset.date;
    section = "week";
  } else if (target.matches(".button__add--month")){
    date = e.target.parentNode.parentNode.parentNode.dataset.date;
    section = "month";
  }
  openPopupTask();
  setCurrentDate(date);
  setCurrentSection(section);
  elements.popupTask.dataset.action = "addTask";
 }

 const openPopupTask = (savedTask = "Your task") => {
  const popupTask = elements.popupTask;
  popupTask.classList.remove("hide");
  elements.popupTaskText.placeholder = savedTask;
  elements.popupTaskText.focus();
}

const setCurrentSection = (section) => {
  elements.popupTask.dataset.section = section;
}

const setCurrentDate = (date) => {
  elements.popupTask.dataset.date = date;
}


export function addTask(e, arr) {
  e.preventDefault(); //prevent refreshing the page/Prevent a link from opening the URL
  const dataSection = e.target.parentNode.parentNode.dataset.section;
  const dataAction = e.target.parentNode.parentNode.dataset.action;
  const taskInputed = elements.popupTaskText.value;
  const dateOfCurrentDay = elements.popupTask.dataset.date;
  const createdCurrentDay = new Day(dateOfCurrentDay, taskInputed);
  if (dataSection == "week") {
    arr = daysArray;
  } else if (dataSection == "month") {
    arr = Month.weeklyTasks;
  }
  const isInArray = arr.some(el => el.date == dateOfCurrentDay);
  const taskToEdit = this.children[0].placeholder;

// check if has clicked plus button(adding a task)
  if (dataAction == "addTask") {
    // checking if the current day(clicked day) is in a daysArray OR if a daysArray is empty AND if the task was written
      if ((!isInArray || arr.length == 0) && taskInputed.length !== 0) {
        // push currentDay object into daysArray
        arr.push(createdCurrentDay);
        // displayDaysTasks(dateOfCurrentDay, taskInputed, false);
      } else {
        arr.forEach(el => {
          // looking for current day in a daysArr AND checking if the task was written AND if the task was written before in the current day
          if (el.date == dateOfCurrentDay && taskInputed.length !== 0 && !el.tasks.some(el => el.task == taskInputed)) {
            // adding new task into current day
            el.addTask(taskInputed);
          }
        })
      }

// check if has clicked edit button next to the task
  } else if (dataAction == "editTask") {
    arr.forEach(el => {
      if (el.date == dateOfCurrentDay && taskInputed.length !== 0 && el.tasks.some(el => el.task == taskToEdit)) {
        el.updateTask(taskToEdit, taskInputed);
      } 
    })
  }
  //reset an input(textarea)
  this.reset(); 
  displayDaysTasks(dateOfCurrentDay)
  hidePopupTask();
  console.log(arr);
}

const displayDaysTasks = (date) => {
  const weekDays = elements.weekDays.querySelectorAll('[data-date]'); // return <div class="section__item" data-date="14 Jan 2019">...</div>
  const taskUncheckedIcon = "far fa-circle";
  const taskCheckedIcon = "far fa-check-circle";
  let isDone;
  
  weekDays.forEach(e => {
    if (e.dataset.date == date) {
      const dayContent = e.children[1];
      const dayArray = daysArray.find(day => day.date == date);
      dayContent.innerHTML = "";
      dayArray.tasks.forEach(el => {
        el.done ? isDone = taskCheckedIcon : isDone = taskUncheckedIcon; 
        
        const html = `<div class="section__item--goal">
                        <button class="button ">
                          <i class="${isDone} button__check"></i>
                        </button>
                        <p class="paragraph section__item--paragraph">${el.task}</p>
                        <button class="button button__hidden">
                          <i class="far fa-edit button__edit"></i>
                        </button>
                        <button class="button button__hidden">
                          <i class="far fa-trash-alt button__delete"></i>
                        </button>
                      </div>`
        dayContent.insertAdjacentHTML('beforeend', html);
      })
    } 
  })
}


// ===================================
 // edit task
 
export const editTask = (e) => {
  if (e.target.classList.contains("button__edit")) {
    // read the current day's date
    const date = e.target.parentNode.parentNode.parentNode.parentNode.dataset.date;
    const task = e.target.parentNode.previousSibling.previousSibling.textContent;
    setCurrentDate(date);
    elements.popupTask.dataset.action = "editTask";

    // open popupTask
    openPopupTask(task);
  }
}

// ===================================
 // remove task | display it

export const deleteTask = (e) => {
  const target = e.target;
  if (target.classList.contains("button__delete"))  {
    // dayContent.remove(elements.sectionItemContent);
    const task = target.parentNode.parentNode.children[1].textContent;
    const dateOfCurrentDay = target.parentNode.parentNode.parentNode.parentNode.dataset.date;

    daysArray.forEach((el, index) => {
      if (el.date == dateOfCurrentDay) {
        el.deleteTask(task,index);
      } 

      displayDaysTasks(dateOfCurrentDay);
    })
  }
}


// ===================================
 // toggle checked/unchecked task | display it

 export const toggleTask = (e, arr) => {
  const target = e.target;
  // check if the target has a button__check class
  if (!target.matches(".button__check")) return;
  const date = target.parentNode.parentNode.parentNode.parentNode.dataset.date;
  const taskText = target.parentNode.nextSibling.nextSibling.textContent;
  // find current day obcject in the daysArray 
  const dayArray = arr.find(day => day.date == date);
  // toggle done key (value true or false)
  dayArray.toggleChecked(taskText);
  // display all tasks for current day
  displayDaysTasks(date);
 }

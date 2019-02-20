import { elements } from '../views/base';
import { changeWeek, daysArray, displayDaysTasks } from './Week';

import * as Month from './Month';
import * as Year from './Year';


// ===================================
// create class Day 
class taskObject {
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
// // selection of the month or week and updating contents of the sections 
export const selectDate = (e) => {
  const target = e.target;
  if (ifTargetMatches(target, ".section__item--title")) {
    const sectionItem = getClosestParent(target, ".section__item");
    const sectionContent = getClosestParent(target, ".section__content").dataset.section
    let date;
    if (sectionContent == "year") {
      date = new Date(`2 ${sectionItem.dataset.date}`)
    } else if (sectionContent == "month") {
      date = new Date(sectionItem.dataset.fulldate);
    } else {
      return
    }
    changeWeek(date)
  }
}


// ===================================
// open/hide task's popup
const openPopupTask = (savedTask = "Your task") => {
  const popupTask = elements.popupTask;
  popupTask.classList.remove("hide");
  elements.popupTaskText.placeholder = savedTask;
  elements.popupTaskText.focus();
}


export const hidePopupTask = () => {
  const popupTask = elements.popupTask;
  popupTask.classList.add("hide");
  popupTask.removeAttribute('data-date');
  popupTask.removeAttribute('data-action');
  popupTask.removeAttribute('data-fulldate');
}


// ===================================
// display months/weeks/days in year/month/week sections
const displaySections = (date) => {
  displayDaysTasks(date);
  Month.displayWeeks();
  Year.displayMonths();
}


// ===================================
// set the current section in the popupTask
const setCurrentSection = (section) => {
  elements.popupTask.dataset.section = section;
}


// ===================================
// set the current date in the popupTask
const setCurrentDate = (date) => {
  elements.popupTask.dataset.date = date;
}


// ===================================
// set the array with tasks depends of the selected section(year, month or week section)
const setArray = (target) => {
  const section = getClosestParent(target, ".section__item--content").dataset.section;
  let arr;

  if(section == "week") {
    arr = daysArray;
  } else if (section == "month") {
    arr = Month.weeklyTasks;
  } else if (section == "year") {
    arr = Year.monthlyTasks;
  }
  return arr;
}


// ===================================
// get the closest parent of the selected element(target) with the specific selector
let getClosestParent = (elem, selector) => {
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;
};


// ===================================
// get task's date of the selected target (from dataset.date of the section__item )
const getDateOfTask = (target) => {
  const date = getClosestParent(target, ".section__item").dataset.date;
  return date;
}


// ===================================
// get task's content from the <p> element
const getTaskContent = (target) => {
  const taskParent = getClosestParent(target, ".section__item--goal");
  console.log("taskParent",taskParent);
  const task = taskParent.children[1].textContent;

  console.log(target,task);
  return task;
}


// ===================================
// checking if target or his parent matches a specific selector / returns boolean
export const ifTargetMatches = (target, selector) => {
  const ifTargetOrParentMatches = (target.matches(selector) || target.parentNode.matches(selector));
  return ifTargetOrParentMatches;
}


// ===================================
// checking if the target is a button__add and if it is the n set up the section an dateof the task 
export const isButtonAdd = (e) => {
  const target = e.target;
  let date;
  let fulldate;
  let section;
  // if target has a class button__add then set the date
  if (ifTargetMatches(target, ".button__add") || ifTargetMatches(target, ".button__edit")) {
    date = getClosestParent(target, ".section__item").dataset.date;
    fulldate = getClosestParent(target, ".section__item").dataset.fulldate;
  } 

  // if target has a class button__add--week or button__edit--week then set the section to week
  if (ifTargetMatches(target, ".button__add--week") || ifTargetMatches(target, ".button__edit--week")) {
    section = "week";
    
    // if target has a class button__add--month or button__edit--month then set the section to month
  } else if (ifTargetMatches(target, ".button__add--month") || ifTargetMatches(target, ".button__edit--month")) {
    section = "month";
    elements.popupTask.dataset.fulldate = fulldate;
  } else if (ifTargetMatches(target, ".button__add--year") || ifTargetMatches(target, ".button__edit--year")) {
    section = "year";
  } else {
    return;
  }

  openPopupTask();
  setCurrentDate(date);
  setCurrentSection(section);
  elements.popupTask.dataset.action = "addTask";
 }


// ===================================
// add task to the array and display it
export function addTask(e, arr) {
  e.preventDefault(); //prevent refreshing the page/Prevent a link from opening the URL
  const target = e.target;
  const dataSection = getClosestParent(target, ".popup-task").dataset.section;
  const dataAction = getClosestParent(target, ".popup-task").dataset.action;
  const taskInputed = elements.popupTaskText.value;
  const currentDay = elements.popupTask.dataset.date;
  const createdCurrentDay = new taskObject(currentDay, taskInputed);

  let newDay;

  if (dataSection == "week") {
    arr = daysArray;
  } else if (dataSection == "month") {
    arr = Month.weeklyTasks;
    //displaying in the week section the week to which one the task is adding
    newDay = new Date(elements.popupTask.dataset.fulldate);
    changeWeek(newDay);
  } else if (dataSection == "year") {
    arr = Year.monthlyTasks;
    //displaying in the month section the month to which one the task is adding
    newDay = new Date(`2 ${currentDay}`);
    changeWeek(newDay)
  }
  const isInArray = arr.some(el => el.date == currentDay);
  const taskToEdit = this.children[0].placeholder;

// check if has clicked plus button(adding a task)
  if (dataAction == "addTask") {
    // checking if the current day(clicked day) is in a daysArray OR if a daysArray is empty AND if the task was written
      if ((!isInArray || arr.length == 0) && taskInputed.length !== 0) {
        // push currentDay object into daysArray
        arr.push(createdCurrentDay);
        // displayDaysTasks(currentDay, taskInputed, false);
      } else {
        arr.forEach(el => {
          // looking for current day in a daysArr AND checking if the task was written AND if the task was written before in the current day
          if (el.date == currentDay && taskInputed.length !== 0 && !el.tasks.some(el => el.task == taskInputed)) {
            // adding new task into current day
            el.addTask(taskInputed);
          }
        })
      }

// check if has clicked edit button next to the task
  } else if (dataAction == "editTask") {
    arr.forEach(el => {
      if (el.date == currentDay && taskInputed.length !== 0 && el.tasks.some(el => el.task == taskToEdit)) {
        el.updateTask(taskToEdit, taskInputed);
      } 
    })
  }
  //reset an input(textarea)
  this.reset(); 
  displaySections(currentDay);
  hidePopupTask();
}


// ===================================
// edit task in the array and display it
 export const editTask = (e) => {
   const target = e.target;
  if (ifTargetMatches(target, ".button__edit" )) {
    // read the current day's date
    const date = getDateOfTask(target);
    const task = getTaskContent(target);
    setCurrentDate(date);
    elements.popupTask.dataset.action = "editTask";

    // open popupTask
    openPopupTask(task);
  }
  else {
    return;
  }
}


// ===================================
// remove task from the array and from html
export const deleteTask = (e) => {
  const target = e.target;
  if (ifTargetMatches(target, ".button__delete"))  {
    const task = getTaskContent(target);
    const date = getDateOfTask(target);
    const arr = setArray(target);
    
    arr.forEach((el, index) => {
      if (el.date == date) {
        el.deleteTask(task,index);
      } 
      displaySections(date);
    })
  }
}


// ===================================
// toggle checked/unchecked task in the array and display it
export const toggleTask = (e) => {
  const target = e.target;
  // check if the target has a button__check class
  if (!ifTargetMatches(target, ".button__check")) return;
  const arr = setArray(target);
  const date = getDateOfTask(target);
  const taskParent = getClosestParent(target, ".section__item--goal");
  const taskText = taskParent.children[1].textContent;
  // find current day obcject in the daysArray 
  const dayArray = arr.find(day => day.date == date);
  // toggle done key (value true or false)
  dayArray.toggleChecked(taskText);
  // display all tasks for current day
  displaySections(date);
}

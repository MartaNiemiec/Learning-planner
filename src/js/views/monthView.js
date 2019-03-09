import { elements } from './base';

import * as Month from '../models/Month';
import * as Year from '../models/Year';
import { setCheckIcon } from '../models/Tasks';


// ===================================
//  display month name in the month section
export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = Year.months[monthNumber.getMonth()];
}

// ===================================
// display Week item
const displayWeekItem = (el) => {
  const html = `
              <div class="section__item" data-date="Week-${el.weekNr} ${el.year}" data-fulldate="${el.firstDay} ${el.year}">
                <h3 class="header-3 section__item--title">
                  <span class="month__week-nr">Week ${el.weekNr}</span>
                  <span class="month__dates">${el.firstDay.split(" ", 2)[0]}-${el.lastDay}</span>
                  <button class="button button__add button__add--month">
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </h3>
                <h3 class="header-3 section__item--content" data-section="month"></h3>
              </div>`;
    elements.monthWeeks.insertAdjacentHTML('beforeend', html);
}

// ===================================
// display weekly task
const displayWeeklyTask = (isDone, task, index) => {
  const monthWeeks = elements.monthWeeks.querySelectorAll('[data-date]');
  const weekContent = monthWeeks[index].children[1];
  const html = `
              <div class="section__item--goal">
                <button class="button button__check">
                  <i class="${isDone}"></i>
                </button>
                <p class="paragraph section__item--paragraph">${task.task}</p>
                <button class="button button__hidden button__edit button__edit--month">
                  <i class="far fa-edit"></i>
                </button>
                <button class="button button__hidden button__delete">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>`
  weekContent.insertAdjacentHTML('beforeend', html);
}


// ===================================
//display weeks with tasks
const displayMonthsTasks = (index, el) => {
  const findWeek = Month.weeklyTasks.find(week => week.date == `Week-${el.weekNr} ${el.year}`);
  if (findWeek !== undefined) {
    const weekFromArray = findWeek;
    const tasksFromArray = weekFromArray.tasks;
    
    tasksFromArray.forEach(task => {
      const checkIcon = setCheckIcon(task);
      //display all tasks of the week
      displayWeeklyTask(checkIcon, task, index);
    })
  }
}


// ===================================
// display weeks in the month section
export const displayWeeks = () => {
  elements.monthWeeks.innerHTML = "";
  Month.getMonthsWeeks().forEach((el,index) => {
    displayWeekItem(el);
    displayMonthsTasks(index, el);
  });
}
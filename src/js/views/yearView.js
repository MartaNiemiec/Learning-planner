import { elements } from '../views/base';
import * as Year from '../models/Year';


// ===================================
// display month item
const displayMonthItem = (el) => {
  const html = `
    <div class="section__item" data-date="${el.month} ${el.year}">
      <h3 class="header-3 section__item--title">
        <span class="month__week-nr">${el.month}</span>
        <button class="button button__add button__add--year">
          <i class="fas fa-plus-circle button__add button__add--year"></i>
        </button>
      </h3>
      <h3 class="header-3 section__item--content" data-section="year">
      </h3>
    </div>`;
  elements.yearMonths.insertAdjacentHTML('beforeend', html);
}


// ===================================
// display monhty task
const displayMonthlyTask = (isDone, task, index) => {
  const yearMonths = elements.yearMonths.querySelectorAll('[data-date]');
  const monthContent = yearMonths[index].children[1];
  const html = `<div class="section__item--goal">
                        <button class="button button__check">
                          <i class="${isDone} button__check"></i>
                        </button>
                        <p class="paragraph section__item--paragraph">${task.task}</p>
                        <button class="button button__hidden button__edit button__edit--year">
                          <i class="far fa-edit button__edit button__edit--year"></i>
                        </button>
                        <button class="button button__hidden button__delete">
                          <i class="far fa-trash-alt button__delete"></i>
                        </button>
                      </div>`
  monthContent.insertAdjacentHTML('beforeend', html);
}


// ===================================
//display months with tasks
const displayMonthsTasks = (index, el) => {
  // find a specific month in the monthlyTasks array
  const findMonth = Year.monthlyTasks.find(month => month.date == `${el.month} ${el.year}`);
  // check if there are any tasks 
  if (findMonth !== undefined) {
    const tasksFromArray = findMonth.tasks;
    // set checked or unchecked icon into the task  
    tasksFromArray.forEach(task => {
      const taskUncheckedIcon = "far fa-circle";
      const taskCheckedIcon = "fas fa-check-circle";
      let isDone;
      task.done ? isDone = taskCheckedIcon : isDone = taskUncheckedIcon; 
      //display all tasks of the month
      displayMonthlyTask(isDone, task, index);
    })
  }
}


// ===================================
// display months in the year section
export const displayMonths = () => {
  elements.yearMonths.innerHTML = "";
  Year.getYearMonths().forEach((month, index) => {
    displayMonthItem(month);
    displayMonthsTasks(index, month);
  });
}

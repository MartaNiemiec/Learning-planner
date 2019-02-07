import { elements } from '../views/base';
import * as Week from './Week';
// import * as Month from './Month'

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthsArray = [];
// monthsArray = [{ year: year, monthNumber: i, month: months[i] }, ...]
export const monthlyTasks = [];

export const displayCurrentYear = (lastChoosedDay) => {
  const lastChoosedYear = lastChoosedDay.getFullYear();
  elements.year.textContent = lastChoosedYear;
}

export const generateMonths = () => {
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

export const getYearMonths = () => {
  let currentYear = Week.lastChoosedDay.toString().split(" ", 4)[3];
  let monthsOfCurrentYear = monthsArray.filter(month => month.year == currentYear);
  if(monthsArray.every(month => month.year !== currentYear)) {
    generateMonths();
    displayMonths();
  }
  return monthsOfCurrentYear;
}

export const displayMonths = () => {
  elements.yearMonths.innerHTML = "";

  getYearMonths().forEach((el, index) => {
    const html = `<div class="section__item" data-date="${el.month} ${el.year}">
                    <h3 class="header-3 section__item--title">
                      <span class="month__week-nr">${el.month}</span>
                      <button class="button ">
                        <i class="fas fa-plus-circle button__add button__add--year"></i>
                      </button>
                    </h3>
                    <h3 class="header-3 section__item--content" data-section="year">
                    </h3>
                  </div>`;
    elements.yearMonths.insertAdjacentHTML('beforeend', html);

    const yearMonths = elements.yearMonths.querySelectorAll('[data-date]');
    const findMonth = monthlyTasks.find(month => month.date == `${el.month} ${el.year}`);
    if (findMonth !== undefined) {
      const monthFromArray = findMonth;
      const tasksFromArray = monthFromArray.tasks;
      
      tasksFromArray.forEach(task => {
        const taskUncheckedIcon = "far fa-circle";
        const taskCheckedIcon = "fas fa-check-circle";
        let isDone;
        const monthContent = yearMonths[index].children[1];
        task.done ? isDone = taskCheckedIcon : isDone = taskUncheckedIcon; 

        const html = `<div class="section__item--goal">
                              <button class="button ">
                                <i class="${isDone} button__check"></i>
                              </button>
                              <p class="paragraph section__item--paragraph">${task.task}</p>
                              <button class="button button__hidden">
                                <i class="far fa-edit button__edit button__edit--year"></i>
                              </button>
                              <button class="button button__hidden">
                                <i class="far fa-trash-alt button__delete"></i>
                              </button>
                            </div>`
        monthContent.insertAdjacentHTML('beforeend', html);
        })
    }
    
  });

}








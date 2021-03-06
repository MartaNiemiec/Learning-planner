import { elements } from './base';
import * as Week from '../models/Week';
import * as Month from '../models/Month';
import * as monthView from './monthView';
import * as Year from '../models/Year';
import * as yearView from './yearView';
import { setCheckIcon } from '../models/Tasks';


// ===================================
// display week's number in the title of the week section
export const displayWeekNr = (date) => {
  elements.weekNumber.innerHTML = Week.weekNr(date);
}

// ===================================
// display Day item
const displayDayItem = (el) => {
  const markup = `<div class="section__item" data-date="${el.date}">
                    <h3 class="header-3 section__item--title"> 
                      <span class="week__day">${el.day}</span>
                      <button class="button button__add button__add--week">
                        <i class="fas fa-plus-circle"></i>
                      </button>
                    </h3>
                    <h3 class="header-3 section__item--content" data-section="week"></h3>
                  </div>`;
    elements.weekDays.insertAdjacentHTML('beforeend', markup);
}



// ===================================
// display Daily task
const displayDailyTask = (checkIcon, el, dayContent) => {
  const html = `<div class="section__item--goal">
                        <button class="button button__check">
                          <i class="${checkIcon}"></i>
                        </button>
                        <p class="paragraph section__item--paragraph">${el.task}</p>
                        <button class="button button__hidden button__edit button__edit--week">
                          <i class="far fa-edit"></i>
                        </button>
                        <button class="button button__hidden button__delete">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </div>`
  dayContent.insertAdjacentHTML('beforeend', html);
}



// ===================================
// display tasks in the specific day (week section)
export const displayDaysTasks = (date) => {
  const weekDays = elements.weekDays.querySelectorAll('[data-date]'); // return <div class="section__item" data-date="14 Jan 2019">...</div>
  
  weekDays.forEach(e => {
    if (e.dataset.date == date) {
      const dayContent = e.children[1];
      const dayArray = Week.daysArray.find(day => day.date == date);
      dayContent.innerHTML = "";
      dayArray.tasks.forEach(el => {
        const checkIcon = setCheckIcon(el);
        displayDailyTask(checkIcon, el, dayContent);
      })
    } 
  })
}


// ===================================
// display days in the week section
export const displayWeekDays = (date) => {
  elements.weekDays.innerHTML = "";
  Week.getWeekDays(date).forEach(el => {
    displayDayItem(el);
    // find weekDay in the daysArray
    const dayArray = Week.daysArray.find(day => day.date == el.date);
    // check is there any day object of the burrent weekDay
    if (dayArray) {
      // display tasks from the current weekDay
      displayDaysTasks(el.date)
    } 
  });
  Week.changeLastChoosedDay(date);
  displayWeekNr(date);
  monthView.displayMonth(date);
  Year.displayCurrentYear(date);
}


// ===================================
// change week/month/year (all three sections at the same time, based on the selected date) 
export const changeWeek = (date) => {
  Week.changeLastChoosedDay(date);
  Week.getWeekDays(date);
  displayWeekDays(date);
  Week.weekNr(date);
  displayWeekNr(date);
  Month.getMonthsWeeks();
  monthView.displayWeeks();
  yearView.displayMonths();
}



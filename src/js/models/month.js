import { elements } from '../views/base';
import * as Week from './Week';

// generated weeks of the year
export const weeks = [];
// array with weekly tasks
export const weeklyTasks = [];

// display mont name in the month section
export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = Week.months[monthNumber.getMonth()];
}

// generate all weeks numbers, theirs first and last day from the current year 
export const generateWeeks = () => {
  const firstDayYear = new Date(Week.lastChoosedDay.getFullYear(), 0, 1);
  for (let i = 0; i<=51; i++) {
    let firstDay = Week.startOfWeek(new Date(firstDayYear.getTime() + 7 * i * 24 * 60 * 60 * 1000), 0);
    firstDay++;
    const newDay = new Date(firstDay);
    const year = newDay.getFullYear();
    const first = newDay.toString().split(" ", 4);
    const last = new Date((newDay.getTime() + 6 * 24 * 60 * 60 * 1000)).toString().split(" ", 4);
    weeks.push({
      weekNr: i+1,
      firstDay: `${first[2]} ${first[1]}`, 
      lastDay: `${last[2]} ${last[1]}`,
      year: year
    })
  }
  return weeks;
}


export const getMonthsWeeks = () => {
  let currentMonth = Week.lastChoosedDay.toString().split(" ", 2)[1];
  let weeksOfCurrentMonth = weeks.filter(week => week.firstDay.includes(currentMonth) || week.lastDay.includes(currentMonth));
  return weeksOfCurrentMonth;
}

export const displayWeeks = () => {
  elements.monthWeeks.innerHTML = "";

  getMonthsWeeks().forEach(el => {
    const markup = `<div class="section__item" data-date="Week-${el.weekNr} ${el.year}">
    <h3 class="header-3 section__item--title">
    <span class="month__week-nr">Week ${el.weekNr}</span>
    <span class="month__dates">${el.firstDay.split(" ", 2)[0]}-${el.lastDay}</span>
    <button class="button ">
    <i class="fas fa-plus-circle button__add button__add--month"></i>
    </button>
    </h3>
    <h3 class="header-3 section__item--content"></h3>
    </div>`;
    elements.monthWeeks.insertAdjacentHTML('beforeend', markup);
  });
}

const changeMonth = (target) => {
  let lastChoosedMonth = Week.lastChoosedDay.getMonth();
  let lastChoosedYear = Week.lastChoosedDay.getFullYear();
  const targetClass = target.classList[2];
  // if the target is a button nextMonth or previousMonth then add or subtract a month by 1 
  targetClass == "button__previous--month" ? lastChoosedMonth-- : lastChoosedMonth++;
  let newDay = new Date(Week.lastChoosedDay.setFullYear(lastChoosedYear, lastChoosedMonth,1));
  Week.changeWeek(newDay);
}

export const nextMonth = (e) => {
  changeMonth(e.target)
}

export const previousMonth = (e) => {
  changeMonth(e.target)
}


export const displayWeeklyTasks = (date) => {
  const monthWeeks = elements.monthWeeks.querySelectorAll('[data-date]'); // return <div class="section__item" data-date="14 Jan 2019">...</div>
  const taskUncheckedIcon = "far fa-circle";
  const taskCheckedIcon = "far fa-check-circle";
  let isDone;
  
  monthWeeks.forEach(e => {
    if (e.dataset.date == date) {
      // console.log("displayWeeklyTasks  e  =", e.dataset.date.split('-',2));
      console.log("displayWeeklyTasks  e  =", e.dataset.date);
      const dayContent = e.children[1];
      const weeksTasks = weeklyTasks.find(day => day.date == date);
      dayContent.innerHTML = "";
      // console.log(weeksTasks);
      weeksTasks.tasks.forEach(el => {
        // console.log("dayContent",dayContent);
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
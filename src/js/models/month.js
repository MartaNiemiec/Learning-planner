import { elements } from '../views/base';
import { ifTargetMatches } from '../models/Tasks';
import * as Week from './Week';
import * as Year from './Year';

// generated weeks of the year
export const weeks = [];
// array with weekly tasks
export const weeklyTasks = [];

// display mont name in the month section
export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = Year.months[monthNumber.getMonth()];
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

  getMonthsWeeks().forEach((el,index) => {
    const markup = `<div class="section__item" data-date="Week-${el.weekNr} ${el.year}" data-fulldate="${el.firstDay} ${el.year}">
                      <h3 class="header-3 section__item--title">
                        <span class="month__week-nr">Week ${el.weekNr}</span>
                        <span class="month__dates">${el.firstDay.split(" ", 2)[0]}-${el.lastDay}</span>
                        <button class="button button__add button__add--month">
                          <i class="fas fa-plus-circle"></i>
                        </button>
                      </h3>
                      <h3 class="header-3 section__item--content" data-section="month"></h3>
                    </div>`;
    elements.monthWeeks.insertAdjacentHTML('beforeend', markup);

    const monthWeeks = elements.monthWeeks.querySelectorAll('[data-date]');
    const findWeek = weeklyTasks.find(week => week.date == `Week-${el.weekNr} ${el.year}`);
    if (findWeek !== undefined) {
      const weekFromArray = findWeek;
      const tasksFromArray = weekFromArray.tasks;
      
      tasksFromArray.forEach(task => {
        const taskUncheckedIcon = "far fa-circle";
        const taskCheckedIcon = "fas fa-check-circle";
        let isDone;
        const weekContent = monthWeeks[index].children[1];
        task.done ? isDone = taskCheckedIcon : isDone = taskUncheckedIcon; 

        const html = `<div class="section__item--goal">
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
        })
    }

  });
}

const changeMonth = (target) => {
  let lastChoosedMonth = Week.lastChoosedDay.getMonth();
  let lastChoosedYear = Week.lastChoosedDay.getFullYear();
  const isButtonPrevious = ifTargetMatches(target, ".button__previous--month");
  // if the target is a button nextMonth or previousMonth then add or subtract a month by 1 
  isButtonPrevious ? lastChoosedMonth-- : lastChoosedMonth++;
  let newDay = new Date(Week.lastChoosedDay.setFullYear(lastChoosedYear, lastChoosedMonth,1));
  Week.changeWeek(newDay);
}

export const nextMonth = (e) => {
  changeMonth(e.target);
}

export const previousMonth = (e) => {
  changeMonth(e.target);
}


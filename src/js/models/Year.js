import { elements } from '../views/base';
// import * as Week from './Week';
// import * as Month from './Month'

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthsArray = [];
// monthsArray = [{ year: year, monthNumber: i, month: months[i] }, ...]
export const monthlyTasks = [];

export const displayCurrentYear = (lastChoosedDay) => {
  const lastChoosedYear = lastChoosedDay.getFullYear();
  elements.year.textContent = lastChoosedYear;
}

const generateMonths = () => {
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

export const displayMonths = () => {
  generateMonths();
  monthsArray.forEach(month => {
    const html = `<div class="section__item" data-date="${month.month} ${month.year}">
                    <h3 class="header-3 section__item--title">
                      <span class="month__week-nr">${month.month}</span>
                      <button class="button ">
                        <i class="fas fa-plus-circle button__add button__add--year"></i>
                      </button>
                    </h3>
                    <h3 class="header-3 section__item--content">
                    </h3>
                  </div>`;
    elements.yearMonths.insertAdjacentHTML('beforeend', html);
    
  })

}









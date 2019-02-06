import { elements } from '../views/base';
// import * as Week from './Week';
// import * as Month from './Month'


export const displayCurrentYear = (lastChoosedDay) => {
  const lastChoosedYear = lastChoosedDay.getFullYear();
  elements.year.textContent = lastChoosedYear;

}









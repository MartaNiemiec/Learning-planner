import { elements } from '../views/base';
import { months } from './week';


export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = months[monthNumber.getMonth()];
}
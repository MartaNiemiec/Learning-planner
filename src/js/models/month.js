import { elements } from '../views/base';
import { months } from '../models/dates';


export const displayMonth = (monthNumber) => {
  elements.month.innerHTML = months[monthNumber.getMonth()];
}
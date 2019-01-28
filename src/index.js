import './scss/main.scss';
import { elements } from './js/views/base.js';
import * as Dates from './js/models/dates'

import * as Skills from './js/models/Skills';






elements.headerDate.innerHTML = `${Dates.dayNr} ${Dates.months[Dates.month]} ${Dates.year}`;


/*
==================================================
 skills module
==================================================
 */

 // getting all icons from the devicon.js file and put them into allIcons array
Skills.getIcons();

 // show or hide popup
elements.skills.addEventListener('click', Skills.showPopup);
elements.popupCloseBtn.addEventListener('click', Skills.hidePopup);

// select an icon after clicking on it
elements.popupIcons.addEventListener('click', Skills.selectIcon);

// update selected skills icons and show them in the skill section
elements.popupUpdateBtn.addEventListener('click', Skills.updateSkills);

// display searched icons in the popup 
elements.popupSearch.addEventListener('change', Skills.displaySearchedIcons)
elements.popupSearch.addEventListener('keyup', Skills.displaySearchedIcons)




/*
==================================================
 dates
==================================================
 */


/*
====================
 WEEK SECTION
====================
 */

// display all week days
Dates.displayWeekDays(Dates.todayDate);

// add goal after clicking on the add button
elements.popupTaskClose.addEventListener('click', Dates.hidePopupTask);
document.addEventListener('click', Dates.isButtonAdd);
elements.popupTaskForm.addEventListener('submit', Dates.addTask);

// edit task
document.addEventListener('click', Dates.editTask);

// delete task after clicking on delete button
document.addEventListener('click', Dates.deleteTask);

// toggle checked and unchecked icon
document.addEventListener('click', Dates.toggleTask);

document.addEventListener('click', Dates.nextWeek);
document.addEventListener('click', Dates.previousWeek);

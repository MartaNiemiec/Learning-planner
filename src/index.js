import './scss/main.scss';
import { elements } from './js/views/base.js';
import * as Week from './js/models/Week';
import * as Month from './js/models/Month';
import * as Year from './js/models/Year';

import * as Skills from './js/models/Skills';






elements.headerDate.innerHTML = `${Week.dayNr} ${Year.months[Week.month]} ${Week.year}`;


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
Week.displayWeekDays(Week.todayDate);


// add goal after clicking on the add button
elements.popupTaskClose.addEventListener('click', Week.hidePopupTask);
document.addEventListener('click', Week.isButtonAdd);
elements.popupTaskForm.addEventListener('submit', Week.addTask);

// edit task
document.addEventListener('click', Week.editTask);

// delete task after clicking on delete button
document.addEventListener('click', Week.deleteTask);

// toggle checked and unchecked icon
document.addEventListener('click', Week.toggleTask);

elements.weekNext.addEventListener('click', Week.nextWeek);
elements.weekPrevious.addEventListener('click', Week.previousWeek);


/*
====================
 MONTH SECTION
====================
 */
Month.generateWeeks();
Month.displayWeeks();

elements.nextMonth.addEventListener('click', Month.nextMonth)
elements.previousMonth.addEventListener('click', Month.previousMonth)





/*
====================
 YEAR SECTION
====================
 */



Year.displayMonths()



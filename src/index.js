import './scss/main.scss';
import { elements } from './js/views/base.js';
import * as Week from './js/models/Week';
import * as weekView from './js/views/weekView';
import * as Month from './js/models/Month';
import * as Year from './js/models/Year';

import * as Skills from './js/models/Skills';
import * as SkillsView from './js/views/skillsView';

import * as Tasks from './js/models/Tasks'






elements.headerDate.innerHTML = `${Week.dayNr} ${Year.months[Week.month]} ${Week.year}`;

/*
==================================================
 YEAR AND MONTH SECTIONS
==================================================
 */

 // selection of the month or week and updating contents of the sections 
document.addEventListener('click', Tasks.selectDate);


/*
==================================================
 SKILLS SECTION
==================================================
 */

 // getting all icons from the devicon.js file and put them into allIcons array
Skills.getIcons();

 // show or hide popup
elements.skills.addEventListener('click', SkillsView.showPopup);
elements.popupCloseBtn.addEventListener('click', SkillsView.hidePopup);

// select an icon after clicking on it
elements.popupIcons.addEventListener('click', SkillsView.selectIcon);

// update selected skills icons and show them in the skill section
elements.popupUpdateBtn.addEventListener('click', SkillsView.updateSkills);

// display searched icons in the popup 
elements.popupSearch.addEventListener('change', SkillsView.displaySearchedIcons)
elements.popupSearch.addEventListener('keyup', SkillsView.displaySearchedIcons)



/*
====================
 WEEK SECTION
====================
 */

// display all week days
weekView.displayWeekDays(Week.todayDate);


// add goal after clicking on the add button
elements.popupTaskClose.addEventListener('click', Tasks.hidePopupTask);
document.addEventListener('click', Tasks.isButtonAdd);
elements.popupTaskForm.addEventListener('submit', Tasks.addTask);

// edit task
document.addEventListener('click', Tasks.editTask);

// delete task after clicking on delete button
document.addEventListener('click', Tasks.deleteTask);

// toggle checked and unchecked icon
document.addEventListener('click', Tasks.toggleTask);

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


Year.generateMonths();
Year.displayMonths();

elements.previousYear.addEventListener('click', Year.previousYear);
elements.nextYear.addEventListener('click', Year.nextYear);




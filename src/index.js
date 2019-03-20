import './scss/main.scss';
import { elements } from './js/views/base.js';
import * as Week from './js/models/Week';
import * as weekView from './js/views/weekView';
import * as Month from './js/models/Month';
import * as monthView from './js/views/monthView';
import * as Year from './js/models/Year';
import * as yearView from './js/views/yearView';
import * as Skills from './js/models/Skills';
import * as SkillsView from './js/views/skillsView';
import * as Tasks from './js/models/Tasks'


/*
============================
 INIT 
============================
 */
// INIT function generating skills icons and dates, displaying all dates
(function init() {
  let weekNr =  Week.month < 10 ? "0" + Week.month : Week.month;
  elements.headerDate.innerHTML = `${Week.dayNr}.${weekNr}.${Week.year}`;
  // getting all icons from the devicon.js file and put them into allIcons array
  Skills.getIcons();
  // display all week days
  weekView.displayWeekDays(Week.todayDate);
  Month.getWeeks();
  monthView.displayWeeks();
  Year.generateMonths();
  yearView.displayMonths();
})()


/*
============================
 TASKS
============================
 */
 // add goal after clicking on the add button
 elements.popupTaskClose.addEventListener('click', Tasks.hidePopupTask);
 elements.sections.addEventListener('click', Tasks.isButtonAdd);
 elements.popupTaskForm.addEventListener('submit', Tasks.addTask);
 // edit task
 elements.sections.addEventListener('click', Tasks.editTask);
 // delete task after clicking on delete button
 elements.sections.addEventListener('click', Tasks.deleteTask);
 // toggle checked and unchecked icon
 elements.sections.addEventListener('click', Tasks.toggleTask);


/*
============================
 YEAR AND MONTH SECTIONS
============================
 */
 // selection of the month or week and updating contents of the sections 
 elements.sections.addEventListener('click', Tasks.selectDate);


/*
============================
 SKILLS SECTION
============================
 */
 // show or hide popup
elements.skills.addEventListener('click', SkillsView.showPopup);
elements.popupCloseBtn.addEventListener('click', SkillsView.hidePopup);
// select an icon after clicking on it
elements.popupIcons.addEventListener('click', SkillsView.selectIcon);
// update selected skills icons and show them in the skill section
elements.popupUpdateBtn.addEventListener('click', SkillsView.updateSkills);
// display searched icons in the popup 
elements.popupSearch.addEventListener('change', SkillsView.displaySearchedIcons);
elements.popupSearch.addEventListener('keyup', SkillsView.displaySearchedIcons);


/*
============================
 WEEK SECTION
============================
 */
elements.weekNext.addEventListener('click', Week.nextWeek);
elements.weekPrevious.addEventListener('click', Week.previousWeek);


/*
============================
 MONTH SECTION
============================
 */
elements.nextMonth.addEventListener('click', Month.nextMonth);
elements.previousMonth.addEventListener('click', Month.previousMonth);


/*
============================
 YEAR SECTION
============================
 */
elements.previousYear.addEventListener('click', Year.previousYear);
elements.nextYear.addEventListener('click', Year.nextYear);




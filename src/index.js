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

 // display current week number
elements.weekNumber.innerHTML = Dates.weekNr(Dates.todayDate);


// display all week days

Dates.displayWeekDays();

import './scss/main.scss';
import { elements, months } from './js/views/base.js';

import * as Skills from './js/models/Skills';




// DATE ON HEADER
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

elements.headerDate.innerHTML = `${day} ${months[month]} ${year}`;


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



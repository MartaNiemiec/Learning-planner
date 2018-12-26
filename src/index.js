import './scss/main.scss';
import { elements, months } from './js/views/base.js';

import {devicons} from './devicon';




// DATE ON HEADER
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

elements.headerDate.innerHTML = `${day} ${months[month]} ${year}`;


/*
==================================================
 showing popup
==================================================
 */
const showPopup = (e) => {
  const target = e.target;
  const addClass = 'skills__icon-add';
  elements.popupSearch.value = '';
  renderIcons();
  if (target.classList.contains(addClass)) {
    const popup = elements.popup;
    popup.classList.remove("hide");
  }
}

const hidePopup = () => {
  const popup = elements.popup;
  popup.classList.add("hide");
}

elements.skills.addEventListener('click', showPopup);
elements.popupCloseBtn.addEventListener('click', hidePopup);


/*
==================================================
 show all devicons in popup
==================================================
 */

const allIcons = [];

//getting icon's names
const getIcons = () => {
  devicons.forEach(el => {
    // if an icon has more than one version display all of them
    if (el.versions.font.length > 1) {
      for (let i = 0; i < el.versions.font.length; i++) {
        allIcons.push({name: el.name, font: el.versions.font[i]});
      }
    } else {
        allIcons.push({name: el.name, font: el.versions.font});
    }
  })
}
getIcons();


// render icons
const renderIcons = () => {
  allIcons.forEach(icon => {
    const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font}"></i>`;
    elements.popupIcons.insertAdjacentHTML('beforeend', markup);
  })
}
// renderIcons();


/*
==================================================
 select skills in popup
==================================================
 */

 //an array with selected icons
const selectedIcons = [];


// 
const selectIcon = (e) => {
  const target = e.target;
  const selectedIconClass = target.classList.value;
  const iconIndex = selectedIcons.indexOf(selectedIconClass);
  // if an icon has been selected then unselect it (change the icon's color and remove it from an array with selected icons)
  if (selectedIcons.includes(selectedIconClass) && target.tagName === 'I') {
    target.classList.remove('selected-icon');
    selectedIcons.splice(iconIndex,1)
  // if an icon hasn't been selected then select it (change the icon's color and add it into an array with selected icons)
  } else if (!selectedIcons.includes(selectedIconClass) && target.tagName === 'I'){
    target.classList.add('selected-icon');
    selectedIcons.push(`${selectedIconClass} selected-icon`);
  
  }
}

elements.popupIcons.addEventListener('click', selectIcon);


const updateSkills = () => {

  // clear all skills from the skill section
  while (elements.skills.hasChildNodes()) {   
    elements.skills.removeChild(elements.skills.firstChild);
  }

  // add all selected icons into the skill section
  selectedIcons.forEach(icon => {
    const classes = icon.replace('selected-icon', '');
    const markup = `<i class="${classes}"></i>`;
    elements.skills.insertAdjacentHTML('beforeend', markup);
  })

  // add at the end adding skills icon
  elements.skills.insertAdjacentHTML('beforeend', '<i class="fas fa-plus-circle skills__icon skills__icon-add"></i>');

  // hide popup
  hidePopup();

}
elements.popupUpdateBtn.addEventListener('click', updateSkills);



/*
==================================================
 search skills
==================================================
 */

 const searchIcons = (wordToMatch, iconsArr) => {
    return iconsArr.filter(icon => {
      const regex = new RegExp(wordToMatch, 'gi');
      return icon.name.match(regex);
      console.log(regex);
    });
 }

 const displaySearchedIcons = () => {
  elements.popupIcons.innerHTML = '';
   const icons = searchIcons(elements.popupSearch.value, allIcons);
   const html = icons.map(icon => {
     return `
     <i class="skills__icon devicon-${icon.name}-${icon.font}"></i>
     `
   }).join('');
   elements.popupIcons.insertAdjacentHTML('beforeend', html);
   console.log(elements.popupSearch.value);
 }

 elements.popupSearch.addEventListener('change', displaySearchedIcons)
 elements.popupSearch.addEventListener('keyup', displaySearchedIcons)

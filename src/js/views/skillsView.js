
import { elements } from '../views/base';
import { allIcons, searchIcons, changeSelected } from '../models/Skills';


/*
==================================================
 render and display icons from allIcons array
==================================================
 */
const renderIcons = () => {
  allIcons.forEach(icon => {
    const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font} ${icon.selectedClass}"></i>`;
    elements.popupIcons.insertAdjacentHTML('beforeend', markup);
  })
}


/*
==================================================
 display skills popup
==================================================
 */
export const showPopup = (e) => {
  const target = e.target;
  const addClass = 'skills__icon-add';
  // show popup 
  if (target.classList.contains(addClass)) {
    const popup = elements.popup;
    popup.classList.remove("hide");
  }
  // clear the value in the search input 
  elements.popupSearch.value = '';
  // render all icons
  renderIcons();
}


/*
==================================================
 clear skills icons in the popup
==================================================
 */
const clearPopup = () => {
  elements.popupIcons.innerHTML = '';
}


/*
==================================================
 hide skills popup
==================================================
 */
export const hidePopup = () => {
  const popup = elements.popup;
  clearPopup();
  popup.classList.add("hide");
}


/*
==================================================
 update and displayskills icons in the skills section
==================================================
 */
export const updateSkills = () => {
  // clear all skills from the skill section
  while (elements.skills.hasChildNodes()) {   
    elements.skills.removeChild(elements.skills.firstChild);
  }

  // show all selected icons in the skills section 
  allIcons.forEach(icon => {
    if (icon.selectedClass === 'selected-icon') {
      const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font}"></i>`;
      elements.skills.insertAdjacentHTML('beforeend', markup);
    }
  });

  // add at the end adding skills icon
  elements.skills.insertAdjacentHTML('beforeend', '<i class="fas fa-plus-circle skills__icon skills__icon-add"></i>');

  // hide popup
  hidePopup();
}


/*
==================================================
 display searched skills icons
==================================================
 */
export const displaySearchedIcons = () => {
  // clear all icons in the popup  
  clearPopup();
  // read inputted values
  const icons = searchIcons(elements.popupSearch.value, allIcons);
  // create a new array witch searched icons 
  const html = icons.map(icon => {
    return `
    <i class="skills__icon devicon-${icon.name}-${icon.font} ${icon.selectedClass}"></i>
    `
  }).join('');
  // display searched icons
  elements.popupIcons.insertAdjacentHTML('beforeend', html);
}


/*
==================================================
 change class of selected icon
==================================================
 */
const changeClass = target => {
  if (target.tagName === 'I') {
    target.classList.toggle("selected-icon");
  }
}


/*
==================================================
 select skills icons in popup
==================================================
 */
export const selectIcon = (e) => {
  const target = e.target;
  // selectedIconClass, icon name and font took from the html
  let selectedIconClass, iconName, iconFont;

  // get the icon name and font from the html after click on the <i> element
  if (target.tagName === 'I') {
    iconName = target.classList.item(1).split("-")[1];
    iconFont = target.classList.item(1).replace(`devicon-${iconName}-`, '');
  }

  // toggle "selected-icon" classname 
  changeClass(target);

  // select a third class of an icon which match for the selecting class  
  // update selected class from html(after toggling it) 
  if (target.classList.item(2) === "selected-icon") {
    selectedIconClass = target.classList.item(2);
  } 
  else {
    selectedIconClass = "";
  }
  
  // update icon.selectedClass (in the array allIcons) clicked icon as the same as in the html
  changeSelected(iconName, iconFont, selectedIconClass);
 }
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

/*
allIcons = [
  {
    name: name,
    font: fontVersion,
    selectedClass: 'selected-icon' of ''
  }
];

*/

//getting icon's names
const getIcons = () => {
  devicons.forEach(el => {
    // if an icon has more than one version display all of them
    if (el.versions.font.length > 1) {
      for (let i = 0; i < el.versions.font.length; i++) {
        allIcons.push({name: el.name, font: el.versions.font[i], selectedClass: ''});
      }
    } else {
        allIcons.push({name: el.name, font: el.versions.font, selectedClass: ''});
    }
  })
}
getIcons();


// render icons
const renderIcons = () => {
  allIcons.forEach(icon => {
    const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font} ${icon.selectedClass}"></i>`;
    elements.popupIcons.insertAdjacentHTML('beforeend', markup);
  })
}
// renderIcons();


/*
==================================================
 select skills in popup
==================================================
 */

const changeClass = target => {
  if (target.tagName === 'I') {
    target.classList.toggle("selected-icon");
  }
}

const changeSelected = (name, font, selected) => {
  allIcons.forEach(icon => {
    // looking for clicked icon in the allIcons array by matching name and font from the html and allIcons array
    const nameIcon = icon.name.match(`${name}$`, 'gi');  
    const fontIcon = String(icon.font).match(`${font}$`, 'gi');

    // when the icon name and font are matched (between html and array) then update icon.selected class in the array for the same as is in the html
    if (nameIcon && fontIcon) icon.selectedClass = selected;
  })
};

const selectIcon = (e) => {
  const target = e.target;
  // select a third class of an icon which match for the selecting class  
  let selectedIconClass = target.classList.item(2);
  // icon name and font took from the html
  let iconName, iconFont;

  // get the icon name and font from the html after click on the <i> element
  if (target.tagName === 'I') {
    iconName = target.classList.item(1).split("-")[1];
    iconFont = target.classList.item(1).replace(`devicon-${iconName}-`, '');
  }

  // toggle "selected-icon" classname 
  changeClass(target);
  
  // update selected class from html(after toggling it)  
  selectedIconClass = target.classList.item(2);

   // update icon.selectedClass (in the array allIcons) clicked icon as the same as in the html
  changeSelected(iconName, iconFont, selectedIconClass);
  console.log(allIcons);
 }

elements.popupIcons.addEventListener('click', selectIcon);



/*
==================================================
 update skills in the skills section
==================================================
 */

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
      const regex = new RegExp(`${wordToMatch}$`, 'gi');
      return icon.name.match(regex);
      console.log(regex);
    });
 }

 const displaySearchedIcons = () => {
   // clear all icons in the popup  
  elements.popupIcons.innerHTML = '';
    // read inputted values
   const icons = searchIcons(elements.popupSearch.value, allIcons);
   // create a new array witch searched icons 
   const html = icons.map(icon => {
     return `
     <i class="skills__icon devicon-${icon.name}-${icon.font}"></i>
     `
   }).join('');
   // display searched icons
   elements.popupIcons.insertAdjacentHTML('beforeend', html);
 }

 elements.popupSearch.addEventListener('change', displaySearchedIcons)
 elements.popupSearch.addEventListener('keyup', displaySearchedIcons)

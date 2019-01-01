import { devicons } from '../devicon.js'
import { elements } from '../views/base';
/*
==================================================
 showing popup
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

export const hidePopup = () => {
  const popup = elements.popup;
  popup.classList.add("hide");
}



/*
==================================================
 show all devicons in popup
==================================================
 */

export const allIcons = [];

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
export const getIcons = () => {
  devicons.forEach(el => {
    // if an icon has more than one version display all of them
    if (el.versions.font.length > 1) {
      for (let i = 0; i < el.versions.font.length; i++) {
        allIcons.push({name: el.name, font: el.versions.font[i], selectedClass: ''});
      }
    } else {
        allIcons.push({name: el.name, font: String(el.versions.font), selectedClass: ''});
    }
  })
}


// render icons
const renderIcons = () => {
  elements.popupIcons.innerHTML = '';
  allIcons.forEach(icon => {
    const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font} ${icon.selectedClass}"></i>`;
    elements.popupIcons.insertAdjacentHTML('beforeend', markup);
  })
}


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

const changeSelected = (name, font, selectedIconClass) => {
  allIcons.forEach(icon => {
    // looking for clicked icon in the allIcons array by matching name and font from the html and allIcons array
    const nameIcon = icon.name.match(`${name}$`, 'gi');  
    const fontIcon = String(icon.font).match(`${font}$`, 'gi');

    // when the icon name and font are matched (between html and array) then update icon.selected class in the array for the same as is in the html
    if (nameIcon && fontIcon) icon.selectedClass = selectedIconClass;
  })
};

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



/*
==================================================
 update skills in the skills section
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
 search skills
==================================================
 */

 const searchIcons = (wordToMatch, iconsArr) => {
    return iconsArr.filter(icon => {
      const regex = new RegExp(`^${wordToMatch}`, 'gi');
      return icon.name.match(regex);
    });
 }

 export const displaySearchedIcons = () => {
   // clear all icons in the popup  
  elements.popupIcons.innerHTML = '';
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

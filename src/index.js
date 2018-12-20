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
const showPopup = () => {
  const popup = elements.popup;
  popup.classList.remove("hide");
}
const hidePopup = () => {
  const popup = elements.popup;
  popup.classList.add("hide");
}

elements.popupAddIcon.addEventListener('click', showPopup);
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
    // console.log(el);
    let icon = {
      name: el.name 
    };

    if (el.versions.font.includes("original")) {
      icon.font = "original";
    } else if (el.versions.font.includes("plain")) {
      icon.font = 'plain';
    } else if (el.versions.font.includes("original-wordmark")) {
      icon.font = 'original-wordmark';
    } else if (el.versions.font.includes("line")) {
      icon.font = 'line';
    } else if (el.versions.font.includes("plain-wordmark")) {
      icon.font = 'plain-wordmark';
    } 
        
    allIcons.push(icon);
  })
}
getIcons();

console.log(allIcons);



// render icons
const renderIcons = () => {

  allIcons.forEach(icon => {
    const markup = `<i class="skills__icon devicon-${icon.name}-${icon.font}"></i>`;
    elements.popupIcons.insertAdjacentHTML('beforeend', markup);
  })

}
renderIcons();


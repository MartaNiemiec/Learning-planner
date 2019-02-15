import { devicons } from '../devicon.js'

/*
==================================================
 create an empty array with all Icons from devicon.js file
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


/*
==================================================
 getting icon's data and push them into an allIcons array
==================================================
 */
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


/*
==================================================
 selecting skills in popup
==================================================
 */

export const changeSelected = (name, font, selectedIconClass) => {
  allIcons.forEach(icon => {
    // looking for clicked icon in the allIcons array by matching name and font from the html and allIcons array
    const nameIcon = icon.name.match(`${name}$`, 'gi');  
    const fontIcon = String(icon.font).match(`${font}$`, 'gi');

    // when the icon name and font are matched (between html and array) then update icon.selected class in the array for the same as is in the html
    if (nameIcon && fontIcon) icon.selectedClass = selectedIconClass;
  })
};


/*
==================================================
 search skills icons in the icons array
==================================================
 */

 export const searchIcons = (wordToMatch, iconsArr) => {
    return iconsArr.filter(icon => {
      const regex = new RegExp(`^${wordToMatch}`, 'gi');
      return icon.name.match(regex);
    });
 }

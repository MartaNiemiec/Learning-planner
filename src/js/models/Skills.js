import { devicons, fontAwesomeBrand } from '../devicon.js'

/*
==================================================
 create an empty array with all Icons from devicon.js file
==================================================
 */
export let allIcons = [];

/*
allIcons = [
  {
    name: name,
    selectedClass: 'selected-icon' or ''
  }
];
*/


/*
==================================================
 getting icon's data and push them into an allIcons array
==================================================
 */
export const getIcons = () => {
  //----- DEVICONS ----- 
  devicons.forEach(el => {
    // if an icon has more than one version display all of them
    if (el.versions.font.length > 1) {
      for (let i = 0; i < el.versions.font.length; i++) {
        allIcons.push({name:`devicon-${el.name}-${el.versions.font[i]}`, selectedClass: ''});
      }
    } else {
        allIcons.push({name:`devicon-${el.name}-${el.versions.font}`, selectedClass: ''});
    }
  })
  
  //----- FONTAWESOME ----- 
  fontAwesomeBrand.forEach(el => {
    allIcons.push({name: el, selectedClass: ''})
  })
}


/*
==================================================
 selecting skills in popup
==================================================
 */

export const changeSelected = (iconClassName, selectedClass) => {
  allIcons.forEach(icon => {
    // comparing icon name from the allIcons array with the iconClassName in the HTML DOM 
    if (icon.name.split(' ').join('') === iconClassName.split(' ').join('')) {
      //update icon.selectedClass in the allIcons array
      icon.selectedClass = selectedClass;
    } else {
      return;
    }
  })
};


/*
==================================================
 search skills icons in the icons array
==================================================
 */

 export const searchIcons = (wordToMatch, iconsArr) => {
    return iconsArr.filter(icon => {
      // looking for the icons corresponding to the imputted value
      let iconName;
      if (icon.name.includes("devicon")) {
        iconName = icon.name.split('-')[1]
      } else if (icon.name.includes("fab")) {
        iconName = icon.name.split(' ')[1].replace("fa-", "")
      }
      return iconName.includes(wordToMatch);
    });
 }

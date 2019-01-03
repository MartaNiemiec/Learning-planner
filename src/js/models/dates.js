// DATE ON HEADER
export let date = new Date();
export let day = date.getDate();
export let month = date.getMonth();
export let year = date.getFullYear();

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/*
==================================================
 WEEK section
==================================================
 */

// ===================================
//get current week number | display it

/*
getDate()	Returns the day of the month (from 1-31)
getDay()	Returns the day of the week (from 0-6)
getFullYear()	Returns the year
getHours()	Returns the hour (from 0-23)
getMilliseconds()	Returns the milliseconds (from 0-999)
getMinutes()	Returns the minutes (from 0-59)
getMonth()	Returns the month (from 0-11)
getSeconds()	Returns the seconds (from 0-59)
*/

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */


 /*
==================================================
 GET WEEK NUMBER
==================================================
 */
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

var result = getWeekNumber(new Date());
console.log(result) //  1









Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }
  
  var today = new Date();
  var weekNumber = today.getWeek();
  console.log(weekNumber); // Returns the week number as an integer


// ===================================
 // get days of the current week | display them
/*
==================================================
 GET FIRST/LAST DAY OF WEEK
==================================================
 */

function startOfWeek(date)
  {
     
    var lastday = date.getDate() - (date.getDay() - 1) ;
    return new Date(date.setDate(lastday));
 
  }

dt = new Date(); 

console.log(endOfWeek(dt).toString());



function endOfWeek(date)
  {
     
    var lastday = date.getDate() - (date.getDay() - 1) + 6; // day of the month - (day of the week - 1) + 6 //eg. 4 - (5-1) + 6 = 6
    return new Date(date.setDate(lastday));
 
  }

dt = new Date(); 

console.log(endOfWeek(dt).toString());







function startOfWeek(date)
  {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
 
  }

dt = new Date(); 

console.log(startOfWeek(dt).toString());


// ===================================
 // go to next/previus week | display changed week









// ===================================
 // add new task after clicking on the plus/add button | display it




// ===================================
 // toggle checked/unchecked task | display it

// import { elements } from '../views/base';
import * as userView from '../views/userView'; 
import * as Tasks from '../models/Tasks'; 
import * as Week from '../models/Week'; 
import * as weekView from '../views/weekView'; 
import * as Month from '../models/Month'; 
import * as Year from '../models/Year'; 
import * as Skills from '../models/Skills'; 
import * as skillsView from '../views/skillsView'; 
// import * as yearView from '../views/yearView'; 
// import * as monthView from '../views/monthView'; 
import { ifTargetMatches } from '../models/Tasks'; 
// import { elements } from '../views/base';
// import { isNullOrUndefined } from 'util';
// import { stat } from 'fs';
// import { strictEqual } from 'assert';

/*
============================
 STATE
============================
 */
export const state = {
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    dailytasks: [], 
    weeklytasks: [], 
    monthlytasks: [],
    skills: Skills.allIcons,
    registered: ''
  }
};


/*
============================
 SET AN EMPTY STATE
============================
 */
const setEmptyState = () => {
  state.route = "signin";
  state.isSignedIn = false;
  state.user.id = '';
  state.user.name = '';
  state.user.email = '';
  state.user.dailytasks = [], 
  state.user.weeklytasks = [], 
  state.user.monthlytasks = [], 
  state.user.skills = Skills.allIcons;
  state.user.registered = '';
}


/*
============================
 ON ROUTE CHANGE
============================
 */
const onRouteChange = (route) => {
  state.route = route;
}


/*
============================
 SET THE ROUTE
============================
 */
export const setRoute = (e) => {
  const target = e.target;
  const registerLink = ifTargetMatches(target, '.register-link');
  const registerBtn = ifTargetMatches(target, '.button__register');
  const signInBtn = ifTargetMatches(target, '.button__sign-in');
  const signOutBtn = ifTargetMatches(target, '.button__sign-out');
  
  if (signInBtn) {
    onSubmitSignIn();    
    userView.displayForm();
  } else if (registerBtn) {
    onSubmitRegister();
    userView.displayForm();
  } else if (registerLink) {
    onRouteChange('register');
    // setEmptyState();
    userView.setSignInMark(false);
    userView.displayForm();
    userView.displayForm();
  } else if (signOutBtn) {
    setEmptyState();
    clearTasks();
    clearSkills();
    skillsView.updateSkills();
    onRouteChange('signin');
    userView.setSignInMark(false);
    userView.displayForm();
    weekView.changeWeek(new Date);

  } 
} 


/*
============================
 FETCH
============================
 */
fetch('http://localhost:3000/') // get database users
  .then(response => response.json())
  .then(console.log)


/*
============================
 signInUser
============================
 */
export const signInUser = {
  signInEmail: '',
  signInPassword: ''
}

/*
============================
 SIGN IN - FETCH
============================
 */
const signIn = () => {
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: signInUser.signInEmail,
      password: signInUser.signInPassword
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        setEmptyState();
        clearTasks();
        loadUser(user);
        onRouteChange('home');
        state.isSignedIn = true;
        userView.setSignInMark(state.isSignedIn);
        setSkills()
        setTasks()
        weekView.changeWeek(new Date);
        skillsView.updateSkills()
      } else if (!user.id){
        console.log("sign in error");
        userView.displayForm('');
      }
    })
}


/*
============================
 SIGN IN
============================
 */
const onSubmitSignIn = () => {
  const signInEmail = document.querySelector(".signInEmail").value;
  const signInPassword = document.querySelector(".signInPassword").value;
  signInUser.signInEmail = signInEmail;
  signInUser.signInPassword = signInPassword;
  signIn();
}


/*
============================
 REGISTERED USER
============================
 */
const registeredUser = {
  email: '',
  password: '',
  name:''
}

/*
============================
 REGISTER - FETCH
============================
 */
const register = () => {
  fetch('http://localhost:3000/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: registeredUser.email,
      password: registeredUser.password,
      name: registeredUser.name
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        loadUser(user);
        onRouteChange('home');
        state.isSignedIn = true;
        userView.setSignInMark(state.isSignedIn);
        user.dailytasks = [],
        user.weeklytasks = [],
        user.monthlytasks = [],
        user.skills = [];
      } else if (!user.id){
        userView.displayForm('');
      }
    })
}


/*
============================
 REGISTER
============================
 */
const onSubmitRegister = () => {
  const registerName = document.querySelector(".registerName").value;
  const registerEmail = document.querySelector(".registerEmail").value;
  const registerPassword = document.querySelector(".registerPassword").value;
  registeredUser.email = registerEmail;
  registeredUser.password = registerPassword;
  registeredUser.name = registerName;

  register();
}


/*
============================
 LOAD THE USER
============================
 */
const loadUser = (data) => {
  state.user = {
    id:  data.id,
    name: data.name,
    email: data.email,
    dailytasks: data.dailytasks,
    weeklytasks: data.weeklytasks,
    monthlytasks: data.monthlytasks,
    skills: data.skills,
    registered: data.registered
  }
}


/*
============================
 UPDATE TASKS AND SKILLS - FETCH
============================
 */
// Tasks.addTask
export const updateTasks = () => {
  fetch('http://localhost:3000/alltasks', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: state.user.id,
      dailytasks: JSON.stringify(Week.daysArray), 
      weeklytasks: JSON.stringify(Month.weeklyTasks), 
      monthlytasks: JSON.stringify(Year.monthlyTasks),
      skills: JSON.stringify(Skills.allIcons)
    })
  })
  .then(response => response.json())
  .then(user => {
    console.log(user);
  })
}

/*
============================
 ADD EVERY TASK FROM THE USER'S STATE AS A CLASS OBJECT TO THE TASK ARRAY
============================
 */
const setAsClass = (tasksArray, stateTasksArray) => {
  stateTasksArray.forEach(el => {
    let date;
    if (el.tasks.length !== 0) {
      date = new Tasks.taskObject(el.date, el.tasks[0].task, el.tasks[0].done);
      el.tasks.forEach(task => {
        if (el.tasks[0] !== task) {
        date.addTask(task.task, task.done);
        } else {
          return;
        }
      })
    } else {
      return;
    }
    tasksArray.push(date);
  })
}


/*
============================
 CLEAR TASKS IN THE SECTION'S ARRAYS
============================
 */
const clearTasks = () => {
Year.monthlyTasks.splice(0, Year.monthlyTasks.length);
Week.daysArray.splice(0, Week.daysArray.length);
Month.weeklyTasks.splice(0, Month.weeklyTasks.length);
}


/*
============================
 ADD USER'S TASKS TO THE SECTION'S TASKS ARRAYS 
============================
 */
const setTasks = () => {
clearTasks();  
setAsClass(Year.monthlyTasks,state.user.monthlytasks);
setAsClass(Week.daysArray, state.user.dailytasks);
setAsClass(Month.weeklyTasks, state.user.weeklytasks);
}


/*
============================
 CLEAR SKILLS ARRAY
============================
 */
const clearSkills = () => {
Skills.allIcons.splice(0,  Skills.allIcons.length);
}


/*
============================
 ADD USER'S SKILLS TO THE ALLICONS ARRAY
============================
 */
const setSkills = () => {
if (state.user.skills.length !== 0) {
  clearSkills();
  Skills.allIcons.push(...state.user.skills) 
}
}



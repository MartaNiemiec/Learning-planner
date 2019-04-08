// import { elements } from '../views/base';
import * as userView from '../views/userView'; 
import * as Tasks from '../models/Tasks'; 
import * as Week from '../models/Week'; 
import * as weekView from '../views/weekView'; 
import * as Month from '../models/Month'; 
import * as Year from '../models/Year'; 
import * as yearView from '../views/yearView'; 
import * as monthView from '../views/monthView'; 
import { ifTargetMatches } from '../models/Tasks'; 
import { elements } from '../views/base';
import { isNullOrUndefined } from 'util';
// import { stat } from 'fs';
import { strictEqual } from 'assert';

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
    allTasks: {
      dailyTasks: [], 
      weeklyTasks: [], 
      monthlyTasks: []
    },
    registered: ''
  }
};


const setEmptyState = () => {
  state.route = "signin";
  state.isSignedIn = false;
  state.user.id = '';
  state.user.name = '';
  state.user.email = '';
  state.user.allTasks = {
      dailyTasks: [], 
      weeklyTasks: [], 
      monthlyTasks: []
  };
  state.user.registered = '';
}


const onRouteChange = (route) => {
  state.route = route;
}


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
    setEmptyState();
    userView.setSignInMark(false);
    userView.displayForm();
    userView.displayForm();
  } else if (signOutBtn) {
    // TODO: after clicking on signout btn clear all tasks arrays!!! 
    setEmptyState();
    clearTasks();
    onRouteChange('signin');
    userView.setSignInMark(false);
    userView.displayForm();
    setTasks();
    weekView.changeWeek(new Date);

  } 
} 

/*
============================
 FETCH
============================
 */
fetch('http://localhost:3000/')
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

// const onEmailChange = (event) => {
//  signInUser.signInEmail = event.target.value
// }
// const onPasswordChange = (event) => {
//   signInUser.signInPassword = event.target.value
// }


const onSubmitSignIn = () => {
  const signInEmail = document.querySelector(".signInEmail").value;
  const signInPassword = document.querySelector(".signInPassword").value;
  signInUser.signInEmail = signInEmail;
  signInUser.signInPassword = signInPassword;
  signIn();
}

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

const clearTasks = () => {
  Year.monthlyTasks.slice(0, state.user.allTasks.monthlyTasks.length);
  Week.daysArray.slice(0, state.user.allTasks.dailyTasks.length);
  Month.weeklyTasks.slice(0, state.user.allTasks.weeklyTasks.length);
}


const setTasks = () => {
  clearTasks();
  setAsClass(Year.monthlyTasks,state.user.allTasks.monthlyTasks);
  setAsClass(Week.daysArray, state.user.allTasks.dailyTasks);
  setAsClass(Month.weeklyTasks, state.user.allTasks.weeklyTasks);
}


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
        setTasks()
        weekView.changeWeek(new Date);
      } else if (!user.id){
        console.log("error");
        userView.displayForm('');
      }
    })
}


const registeredUser = {
  email: '',
  password: '',
  name:''
}

const onSubmitRegister = () => {
  const registerName = document.querySelector(".registerName").value;
  const registerEmail = document.querySelector(".registerEmail").value;
  const registerPassword = document.querySelector(".registerPassword").value;
  registeredUser.email = registerEmail;
  registeredUser.password = registerPassword;
  registeredUser.name = registerName;

  register();
}

const loadUser = (data) => {
  state.user = {
    id: data.id,
    name: data.name,
    email: data.email,
    allTasks: data.allTasks,
    registered: data.registered
  }
}

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
      if (user) {
        loadUser(user.id);
        onRouteChange('home');
        state.isSignedIn = true;
        userView.setSignInMark(state.isSignedIn);
      } else if (!user.id){
        userView.displayForm('');
      }
    })
}


// Tasks.addTask
export const updateTasks = () => {
  // console.log("----------- UPDATE TASK --------");
  fetch('http://localhost:3000/alltasks', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: state.user.id,
      dailyTasks: Week.daysArray, 
      weeklyTasks: Month.weeklyTasks, 
      monthlyTasks: Year.monthlyTasks
    })
  })
    .then(response => response.json())
    .then(user => {
      console.log(user);
      // state.user.allTasks.dailyTasks.splice(0,state.user.allTasks.dailyTasks.length);
      // state.user.allTasks.dailyTasks.push(...user.allTasks.dailyTasks);

      // state.user.allTasks.weeklyTasks.splice(0,state.user.allTasks.weeklyTasks.length);
      // state.user.allTasks.weeklyTasks.push(Month.weeklyTasks);

      // state.user.allTasks.monthlyTasks.splice(0,state.user.allTasks.monthlyTasks.length);
      // state.user.allTasks.monthlyTasks.push(...user.allTasks.monthlyTasks);

    })
}


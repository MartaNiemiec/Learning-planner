// import { elements } from '../views/base';
import * as userView from '../views/userView'; 
import { ifTargetMatches } from '../models/Tasks'; 
import { elements } from '../views/base';
import { isNullOrUndefined } from 'util';

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
    // tasks: [{}],
    registered: ''
  }
};
/*
  state = {
    route: 'signin/register/home',
    isSignIn: true/false
  }
*/

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
    onSubmitSignIn()
    // onRouteChange('home');
    // userView.setSignInMark(true)
    userView.displayForm();
  } else if (registerBtn) {
    onSubmitRegister();
    userView.displayForm();
  } else if (registerLink) {
    onRouteChange('register');
    userView.setSignInMark(false);
    userView.displayForm();
    userView.displayForm();
  } else if (signOutBtn) {
    onRouteChange('signin');
    userView.setSignInMark(false);
    userView.displayForm();
  } 
} 






/* 
IF STATE == SIGNIN -> SIGNIN FORM


onRouteChange(route) = after click on button signIn go to routr "home"

{if route home -> signOut btn -> signIn}
else 
  {if route signInForm -> register or home

  if route registerForm -> register or home}


  ??? if SignedIn ->  signOut else
  ??? signed in or register

  if route == signOut -> isSigneIn = false 
  else if route == home -> isSignIn = true
*/


/*
============================
 FETCH
============================
 */
fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(console.log)

  // const getState = () => {
  //   console.log(state.route);
  //   return state.route
  // }


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
  console.log(signInUser);
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
    // .then(data => {
    //   console.log(data);
    //   if (data === 'success') {
    //     onRouteChange('home');
    //     state.isSignedIn = true;
    //     userView.setSignInMark(state.isSignedIn);
    //   } else if (data !== 'success'){
    //     console.log("error");
    //     userView.displayForm('');
    //   }
    // })
    .then(user => {
      console.log(user);
      if (user.id) {
        loadUser(user);
        onRouteChange('home');
        state.isSignedIn = true;
        userView.setSignInMark(state.isSignedIn);
      } else if (!user.id){
        console.log("error");
        userView.displayForm('');
      }
    })
    console.log(signInUser);
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
  console.log(registeredUser);
}

const loadUser = (data) => {
  state.user = {
    id: data.id,
    name: data.name,
    email: data.email,
    // tasks: data.tasks,
    registered: data.joined
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
      console.log("user -->  ", user);
      if (user) {
        loadUser(user.id);
        onRouteChange('home');
        state.isSignedIn = true;
        userView.setSignInMark(state.isSignedIn);
      } else if (!user.id){
        console.log("error");
        userView.displayForm('');
      }
    })
    console.log("state -->  ", state);
    console.log("registeredUser -->  ", registeredUser);
}







/*
===============================
  SET ROUTE STATE
===============================

export const setRouteState = (e) => {
  const target = e.target;
  const registerLink = ifTargetMatches(target, '.register-link');
  const registerBtn = ifTargetMatches(target, '.button__register');
  const signInBtn = ifTargetMatches(target, '.button__sign-in');
  const signOutBtn = ifTargetMatches(target, '.button__sign-out');

  // if (registerBtn || signInBtn) {
  //   state.route = "home";
  //   state.isSignedIn = true;
  //   // target.parentNode.id = 'profile';
  // } else if (signOutBtn) {
  //   state.route = "signin";
  //   state.isSignedIn = false;
  //   // target.parentNode.id = 'signin';
  // } else 
  if (registerLink) {
    // target.parentNode.id = 'register';
    state.route = "register";
    state.isSignedIn = false;
    userView.displayForm('');
  } else {
    console.log(target);
  }
  // userView.setSignInMark(state.isSignedIn)
}
*/







/*
===============================
  GET FORM
===============================

export const getForm = (e) => {
  setRouteState(e);
  const route = getState();
  console.log(route);
  let target = e.target;
  // const email = target.email.value;
  // const password = target.password.value;
  // const name = target.name.value;


  
  console.log(target);
  // console.log("target.parentNode --> ", target);
  if (state.route === 'register') {
    // register(email, password, name);
    
    console.log(state.route);

  }else if (state.route === 'signin') {
    signIn(email, password);
    console.log(state.route);

  }
  // if (ifTargetMatches(target, '.button__user')) {
  //   setRouteState(target);
  //   userView.setForm();
  //   userView.hideForm();
  // } else if (ifTargetMatches(target, '.register-link')) {
  //   setRouteState(target);
  //   userView.setForm();
  // } 
  // console.log("target", document.forms[0]);
}






const register = (email, password, name) => {
  fetch('http://localhost:3000/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user) {
        loadUser(user)
        state.route = "home";
        state.isSignedIn = true;
        // console.log(state);
        userView.displayForm('');
        userView.setSignInMark(state.isSignedIn)
      }
    })
}

const loadUser = (data) => {
  state.user = {
    id: data.id,
    name: data.name,
    email: data.email,
    tasks: data.tasks,
    registered: data.joined
  }
}


*/


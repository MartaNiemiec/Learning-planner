// import { elements } from '../views/base';
import * as userView from '../views/userView'; 
import { ifTargetMatches } from '../models/Tasks'; 

/*
============================
 STATE
============================
 */
export const state = {
  route: "signin",
  isSignedIn: false
};
/*
  state = {
    route: 'signin/register/home',
    isSignIn: true/false
  }
*/


export const setRouteState = (e) => {
  let target = e.target;

  const registerLink = ifTargetMatches(target, '.register-link');
  const registerBtn = ifTargetMatches(target, '.button__register');
  const signInBtn = ifTargetMatches(target, '.button__sign-in');
  const signOutBtn = ifTargetMatches(target, '.button__sign-out');

  if (registerBtn || signInBtn) {
    state.route = "home";
    state.isSignedIn = true;
  } else if (signOutBtn) {
    state.route = "signin";
    state.isSignedIn = false;
  } else if (registerLink) {
    state.route = "register";
    state.isSignedIn = false;
  } else {
    console.log(target);
  }

  userView.signin();
}


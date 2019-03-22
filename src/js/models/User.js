import { elements } from '../views/base';
import * as userView from '../views/userView'; 

/*
============================
 STATE
============================
 */
export const state = {
  route: "home",
  isSignIn: false
};
/*
  state = {
    route: 'signin/register/home',
    isSignIn: true/false
  }
*/

/*
  state = {
  route: "home",
  isSignIn: false
  };
*/
const ifTargetMatches = (target, selector) => {
  const ifTargetOrParentMatches = (target.matches(selector) || target.parentNode.matches(selector));
  return ifTargetOrParentMatches;
}

export const setRouteState = (e) => {
  let target = e.target;

  const registerLink = ifTargetMatches(target, '.register-link');
  const registerBtn = ifTargetMatches(target, '.button__register');
  const signInBtn = ifTargetMatches(target, '.button__sign-in');
  const signOutBtn = ifTargetMatches(target, '.button__sign-out');

  if (registerBtn) {
    state.route = "home";
  } else if (signInBtn) {
    state.route = "home";
  } else if (signOutBtn) {
    state.route = "signin";
  } else if (registerLink) {
    state.route = "register";
  } else {
    console.log(target);
  }

  userView.signin();
}


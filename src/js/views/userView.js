import { elements } from './base';

import * as User from '../models/User';

export const getSignin = () => {
  const html = `
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="name">Password</label>
            <input type="password" id="password" name="password" required>
            <button class="button button__user button__sign-in">Sign in</button>
            
            <a href="#" class="register-link">Register</a>`
  return html;
}

export const getRegister = () => {
  const html = `
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="name">Password</label>
            <input type="password" id="password" name="password" required>
            <button class="button button__user button__register">Register</button>`
          return html;
}

export const getProfile = (name, email) => {
  const html = `
            <div class="user-account">
              <i class="fas fa-user-circle user-account__icon"></i>
              <p class="user-data">
                <span class="user-name">${name}</span>
                <span class="user-email">${email}</span>
              </p>
            </div>
            <p class="nav__user--sign-out button button__user button__sign-out">
              <span>Sign out</span>
              <i class="fas fa-sign-out-alt"></i>
            </p>`
          return html;
}

export const toggleFormHideClass = () => {
   elements.userForm.classList.toggle('hide');
}

const setForm = () => {
  let markup;
  const route = User.state.route;
  if (route === 'signin') {
    markup = getSignin();
  } else if (route === 'register') {
    markup = getRegister();
  } else if (route === 'home') {
    markup = getProfile('user name', 'email@email.com');
  }
  return markup;
}


export const setSignInMark = (isSignIn) => {
  const greenDot = document.querySelector('.fa-user');
  isSignIn ? greenDot.classList.add('logged-in') : greenDot.classList.remove('logged-in');
}


export const displayForm = () => {
  // clean box for form 
  elements.userForm.innerHTML = '';
  // set up form based on the current state
  const markup = setForm();
  // display/hide form
  toggleFormHideClass();
  
  elements.userForm.insertAdjacentHTML('beforeend', markup);
}











/*
===============================
  DISPLAY FORM
===============================


export const displayForm = (e) => {
  const target = e.target;
 
  setForm(target);
  // console.log("target.classList -> ",target.classList
  // );
}
*/

/*
===============================
  SET FORM
===============================

export const setForm = (target) => {
  const route = User.state.route;
  elements.userForm.innerHTML = '';
  let markup;
  
  if (route === 'signin') {
    markup = getSignin();
    // target.parentNode.children[1].id = 'signin';
  } else if (route === 'register') {
    markup = getRegister();
    // target.parentNode.children[1].id = 'register';
  } else if (route === 'home') {
    markup = getProfile('user name', 'email@email.com');
    // target.parentNode.children[1].id = 'profile';
  }



  if (target === undefined) {
    return
  } else if (target.classList.contains('nav__user')) {
    // console.log("target -> ",target.parentNode.children[1]);
    target.parentNode.children[1].id = route;
  }
  elements.userForm.insertAdjacentHTML('beforeend', markup);

  // setSignInMark(target)
}
*/

/*
===============================
  SET SING IN MARK (GREEN DOT)
===============================

export const setSignInMark = (isSignIn) => {
  const greenDot = document.querySelector('.fa-user');
  isSignIn ? greenDot.classList.add('logged-in') : greenDot.classList.remove('logged-in');
}
*/

/*
===============================
  DISPLAY FORM
===============================

export const hideForm = () => {
  elements.userForm.classList.add('hide');
}
*/
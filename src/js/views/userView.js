import { elements } from './base';

import * as User from '../models/User';


// ==============================
export const getSignin = () => {
  const html = `
            <label for="email">Email</label>
            <input class="signInEmail" type="email" id="email" name="email" required>
            <label for="name">Password</label>
            <input class="signInPassword" type="password" id="password" name="password" required>
            <button class="button button__user button__sign-in">Sign in</button>
            
            <a href="#" class="register-link">Register</a>`
  return html;
}


// ==============================
export const getRegister = () => {
  const html = `
            <label for="name">Name</label>
            <input class="registerName" type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input class="registerEmail" type="email" id="email" name="email" required>
            <label for="name">Password</label>
            <input class="registerPassword" type="password" id="password" name="password" required>
            <button class="button button__user button__register">Register</button>`
          return html;
}


// ==============================
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


// ==============================
export const toggleFormHideClass = () => {
   elements.userForm.classList.toggle('hide');
}


// ==============================
const setForm = () => {
  let markup;
  const route = User.state.route;
  if (route === 'signin') {
    markup = getSignin();
  } else if (route === 'register') {
    markup = getRegister();
  } else if (route === 'home') {
    markup = getProfile(User.state.user.name, User.state.user.email);
  }
  return markup;
}


// ==============================
export const setSignInMark = (isSignIn) => {
  const greenDot = document.querySelector('.fa-user');
  isSignIn ? greenDot.classList.add('logged-in') : greenDot.classList.remove('logged-in');
}


// ==============================
const toggleActiveUserIcon = () => {
  elements.navIcon.classList.toggle('nav__icon--active');
}


// ==============================
export const displayForm = () => {
  // clean box for form 
  elements.userForm.innerHTML = '';
  // set up form based on the current state
  const markup = setForm();
  // display/hide form
  toggleFormHideClass();
  toggleActiveUserIcon()
  
  elements.userForm.insertAdjacentHTML('beforeend', markup);
}


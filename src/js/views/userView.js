import { elements } from './base';

import * as User from '../models/User';

export const getSignin = () => {
  const html = `
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="name">Password</label>
            <input type="password" id="password" name="password" required>
            <input class="button button__user button__sign-in" type="submit" value="Sign in">
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
            <input class="button button__user button__register" type="submit" value="Register">`
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


/*
===============================
  DISPLAY FORM
===============================
*/

export const displayForm = (e) => {
  const target = e.target;
  elements.userForm.classList.toggle('hide');
  setForm();
}


/*
===============================
  SET FORM
===============================
*/
export const setForm = () => {
  const route = User.state.route;
  elements.userForm.innerHTML = '';
  let markup;

  if (route === 'signin') {
    markup = getSignin();
  } else if (route === 'register') {
    markup = getRegister();
  } else if (route === 'home') {
    markup = getProfile('user name', 'email@email.com');
  }

  elements.userForm.insertAdjacentHTML('beforeend', markup);
}


/*
===============================
  SET SING IN MARK (GREEN DOT)
===============================
*/
export const setSignInMark = (isSignIn) => {
  const greenDot = document.querySelector('.fa-user');
  isSignIn ? greenDot.classList.add('logged-in') : greenDot.classList.remove('logged-in');
}


/*
===============================
  DISPLAY FORM
===============================
*/
export const hideForm = () => {
  elements.userForm.classList.add('hide');
}
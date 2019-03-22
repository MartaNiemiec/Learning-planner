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

export const signin = () => {
  elements.userForm.innerHTML = '';
  const route = User.state.route;
  let markup;

  if (route === 'signin') {
    markup = getSignin();
    document.querySelector('.fa-user').classList.remove('logged-in');
  } else if (route === 'register') {
    markup = getRegister();
    document.querySelector('.fa-user').classList.remove('logged-in');
  } else if (route === 'home') {
    markup = getProfile('user name', 'email@email.com');
    document.querySelector('.fa-user').classList.add('logged-in');
  }
  elements.userForm.insertAdjacentHTML('beforeend', markup);

}
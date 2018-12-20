import './scss/main.scss';

import { elements, months } from './js/views/base.js';

// DATE ON HEADER
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

elements.headerDate.innerHTML = `${day} ${months[month]} ${year}`;

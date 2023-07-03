import fetchCountries from './fetchCountries(searchQuery)';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { notice } from '@pnotify/core';

import templates from './templates/country-card.hbs';

defaultModules.set(PNotifyMobile, {});

const inputEl = document.querySelector('#country');
const countriesList = document.querySelector('.js-list');
const contentEl = document.querySelector('.js-content');
console.log(contentEl);

inputEl.addEventListener('input', debounce(countrySearch, 500));

function countrySearch(e) {
  const country = e.target.value;
  fetchCountries(country)
    .then(res => {
      console.log(res);
      countriesList.innerHTML = '';
      contentEl.innerHTML = '';
      if (res.length > 10) {
        alert({
          type: notice,
          text: 'Enter more letters!',
          delay: 2000,
        });
      } else if (res.length > 1 && res.length <= 10) {
        const countriesHtml = res
          .map(item => `<li>${item.name.common}</li>`)
          .join('');
        countriesList.innerHTML = countriesHtml;
      } else if (res.length === 1) {
        const card = templates(res);

        contentEl.insertAdjacentHTML('afterbegin', card);
      }
    })
    .catch(err => {
      alert({
        type: notice,
        text: 'Error',
        delay: 2000,
      });
      console.log(err);
    });
}

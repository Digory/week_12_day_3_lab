const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const CountryView = require('./views/country_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const countries = new Countries();
  countries.bindEvents();

  const selectElement = document.querySelector('#countries');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const container = document.querySelector('#country');
  const countryView = new CountryView(container);
  countryView.bindEvents();
});

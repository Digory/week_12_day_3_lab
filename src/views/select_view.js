const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(selectElement){
    this.selectElement = selectElement;
}

SelectView.prototype.bindEvents = function(){
     PubSub.subscribe('Countries:all-countries-ready',(event)=>{
        const allCountries = event.detail;
        this.populateMenu(allCountries);
    });
    this.selectElement.addEventListener('change', (event)=>{
        const countryIndex = event.target.value;
        PubSub.publish('SelectView:country-selected', countryIndex);
    })
};

SelectView.prototype.populateMenu = function(allCountries){
    allCountries.forEach((country, index)=>{
        const option = document.createElement('option');
        option.textContent = country.name;
        option.value = index;
        this.selectElement.appendChild(option);
    });
}

module.exports = SelectView;
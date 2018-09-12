const PubSub = require('../helpers/pub_sub.js');
const Countries = require('../models/countries.js');

const CountryView = function(container){
    this.container = container;
}

CountryView.prototype.bindEvents = function(){
    PubSub.subscribe('Countries:selected-country-ready', (event)=>{
        this.displayCountryInfo(event.detail);
    });
}

CountryView.prototype.displayCountryInfo = function(country){
    this.container.innerHTML = '';
    this.createElements(country);
    this.addTextToElements(country);
    this.addElementsToContainer();
}

CountryView.prototype.createElements = function(country){
    this.headingElement = document.createElement('h2');
    this.imageElement = document.createElement('img');
    this.imageElement.setAttribute('src', country.flag);
    this.imageElement.setAttribute('height', '25%');
    this.imageElement.setAttribute('width', '25%');
    this.imageElement.addEventListener('click', (event)=>{
            if(this.imageElement.classList.contains('rotate')){
                this.imageElement.classList.remove('rotate');
            }
            else{
                this.imageElement.classList.add('rotate');
            }
    })
    this.regionHeadingElement = document.createElement('h3');
    this.regionParagraphElement = document.createElement('p');
    this.languagesHeadingElement = document.createElement('h3');
    this.unorderedListElement = document.createElement('ul');
};

CountryView.prototype.addTextToElements = function(country){
    this.headingElement.textContent = country.name;
    this.regionHeadingElement.textContent = 'Region:';
    this.regionParagraphElement.textContent = country.region;
    this.languagesHeadingElement.textContent = 'Languages:';
    for(let language of country.languages){
        const listElement = document.createElement('li');
        listElement.textContent = language.name;
        this.unorderedListElement.appendChild(listElement);
    };
};

CountryView.prototype.addElementsToContainer = function(){
    this.container.appendChild(this.headingElement);
    this.container.appendChild(this.imageElement);
    this.container.appendChild(this.regionHeadingElement);
    this.container.appendChild(this.regionParagraphElement);
    this.container.appendChild(this.languagesHeadingElement);
    this.container.appendChild(this.unorderedListElement);
}

module.exports = CountryView;
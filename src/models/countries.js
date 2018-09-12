const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function(){
    this.data = null;
}

Countries.prototype.bindEvents = function(){
    const request = new Request('https://restcountries.eu/rest/v2/all');
    request.get((data)=>{
        this.data = data;
        PubSub.publish('Countries:all-countries-ready', this.data);
    }); 
    PubSub.subscribe('SelectView:country-selected', (event)=>{
        const countryIndex = event.detail;
        console.log(this.data[countryIndex]);        
        PubSub.publish('Countries:selected-country-ready', this.data[countryIndex]);
    });
};

// Countries.prototype.publishCountryDetails = function(){
//     PubSub.subscribe('SelectView:country-selected', (event)=>{
//         const countryIndex = event.detail;
//         console.log(this.data[countryIndex]);
        
//         PubSub.publish('Countries:selected-country-ready', this.data[countryIndex]);
//     });
// }

module.exports = Countries;
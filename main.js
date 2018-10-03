import { homePage } from './pages/home.js';
import { listPage } from './pages/list.js';

var app = {
  currencies: {},
  optionSelected: 'USD'
}

let request = new XMLHttpRequest();
request.onload = function() {
  let data = JSON.parse(this.response); 
  if(request.status >= 200 && request.status < 400) {
    for(const currency in data) {
      const element = data[currency];
      app.currencies[currency] = element['15m'];
    }
    localStorage.currencies = app.currencies;
    if(localStorage.optionSelected) {
      app.optionSelected = localStorage.optionSelected;
    }

    homePage.definePage(app);
    listPage.definePage(app);
  }
};

request.timeout = 2000;
request.onerror = function() {
  console.log("On Error");
  let currencies = localStorage.currencies;
  if(currencies) {
    app.currencies = currencies;
    app.optionSelected = localStorage.optionSelected;
  } else {
    app.currencies = {
        'USD': 6592.95,
        'BRL': 26491.12,
        'CAD': 8443.77,
        'CHF': 6488.19,
        'EUR': 5691.68,
        'JPY': 749184.45,
        'PLN': 24422.49,
        'RUB': 428689.29,
        'THB': 213150.01,
        'TWD': 201634.89
    }
  }
}

request.open('GET', 'https://blockchain.info/ticker', true);
request.send();

document.body.onload = async function() {
  const nav = document.querySelector('ion-nav');
  await nav.componentOnReady();
  nav.root = 'home-page';
};

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(console.log('ServiceWorker Registered'));
}

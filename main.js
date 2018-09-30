import { homePage } from './pages/home.js';
import { listPage } from './pages/list.js';

homePage.definePage();
listPage.definePage();

document.body.onload = async function() {
  const nav = document.querySelector('ion-nav');
  await nav.componentOnReady();
  nav.root = 'home-page';
};



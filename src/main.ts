import './style.css';

import { App } from './app/App';

const container = document.getElementById('app');

if (container === null) {
  throw new Error('App container not found.');
}

const app = new App(container);
app.start();

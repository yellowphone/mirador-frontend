import React from 'react';
import { render } from 'react-dom';
import { App } from './App/App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';

render(<App />, document.getElementById('root'));

// if (module.hot) {
//     module.hot.accept();
// }

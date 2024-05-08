import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//Import Assets (Resourses: styles, img, fonts )

import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/normalize.css';
import './assets/css/styles.css';
import './assets/css/responsive.css';

/* React Npm tIME AGO */

import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);


//Set Up React Application
ReactDOM.createRoot(document.getElementById('root')).render(
 
    <App />
 
)

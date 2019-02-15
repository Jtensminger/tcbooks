import React from 'react';
import { hydrate, render } from "react-dom";
import Auth from "./auth"
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const auth = new Auth()

// const handleAuthentication = ({location}) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// }
render(<App auth={auth} />, document.getElementById('root'))
// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//     hydrate(<App auth={auth}/>, rootElement);
//   } else {
//     render(<App auth={auth}/>, rootElement);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import Theme from '@atlaskit/theme';
import Auth from "./auth"
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ContextProviderComponent } from "./provider"
const auth = new Auth()

// const handleAuthentication = ({location}) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// }

ReactDOM.render(
    // <ContextProviderComponent>
        <Theme.Consumer> 
        {tokens => (
            <App tokens={tokens} auth={auth}/> 
        )}  
        </Theme.Consumer>, document.getElementById('root'));
// </ContextProviderComponent>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

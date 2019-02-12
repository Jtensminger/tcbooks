import React from 'react';
import ReactDOM from 'react-dom';
import Theme from '@atlaskit/theme';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ContextProviderComponent } from "./provider"
import Auth from "./auth"
const auth = new Auth()

ReactDOM.render(
    <ContextProviderComponent>
        <Theme.Consumer> 
        {tokens => (
            <App auth={auth} tokens={tokens}/> 
        )}  
        </Theme.Consumer>
    </ContextProviderComponent>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

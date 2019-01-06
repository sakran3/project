import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login';
import Admin from './admin';
import * as serviceWorker from './serviceWorker';
import {Route,Link,Router,browserHistory} from 'react-router';
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
    </Router>,document.getElementById('root')
);
serviceWorker.unregister();

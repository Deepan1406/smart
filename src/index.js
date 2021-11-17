import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import DetailView from './detailview'

const ErrorPage =()=>(
<h1>not found</h1>
)

ReactDOM.render(
  <Router>
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/detail" component={()=><DetailView/>} />
    <Route exact path="/*" component={ErrorPage} />
   
    </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

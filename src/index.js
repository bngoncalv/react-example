import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthorBox from './components/Author';
import BookBox from './components/Book';
import Home from './Home'
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/authors" component={AuthorBox}/>
      <Route path="/books" component={BookBox}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

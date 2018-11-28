import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';

import {Router, Route, browserHistory} from 'react-router';
import {CommentBox} from './CommentBox.jsx';
import {CommentEdit} from './CommentEdit.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={CommentBox}/>
    <Route path="/:id" component={CommentEdit} />
  </Router>,
  document.getElementById('content')
);

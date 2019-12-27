import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './tailwind.css';
import App from './App';

ReactDOM.render(
  <Router basename="/mernCrudBlog">
    <App />
  </Router>,
  document.getElementById('root')
);

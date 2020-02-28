import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './tailwind.css';
import App from './App';
import UserConfirmation from './components/UserConfirmation';

ReactDOM.render(
  <Router
    // custom ui for Prompt
    getUserConfirmation={(message, callback) => {
      ReactDOM.render(
        <UserConfirmation message={message} callback={callback} />,
        document.getElementById('modal-root')
      );
    }}
  >
    <App />
  </Router>,
  document.getElementById('root')
);

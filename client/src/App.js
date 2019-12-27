import React, { useState } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal';
import Home from './pages/Home';
import Post from './pages/Post';
import Author from './pages/Author';
import About from './pages/About';
import Error404 from './pages/Error404';
import store from './store';

function App({ location, history }) {
  const [collapsibleNavIsExpanded, setCollapsibleNavIsExpanded] = useState(
    false
  );
  return (
    <Provider store={store}>
      <Navbar
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        toggleCollapsibleNav={() =>
          setCollapsibleNavIsExpanded(!collapsibleNavIsExpanded)
        }
      />
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:slug" component={Post} />
        <Route exact path="/authors/:slug" component={Author} />
        <Route exact path="/about" component={About} />
        <Route component={Error404} />
      </Switch>
      <Footer />
      <Modal />
    </Provider>
  );
}

export default withRouter(App);

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

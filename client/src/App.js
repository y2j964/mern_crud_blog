import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import AuthValidator from './components/AuthValidator';
import AddPostOverlay from './components/AddPostOverlay';
import Home from './pages/Home';
import Post from './pages/Post';
import Author from './pages/Author';
import About from './pages/About';
import AddPost from './pages/AddPost';
import EditPosts from './pages/EditPosts';
import EditPost from './pages/EditPost';
import Error404 from './pages/Error404';
import store from './store';
import { getUser } from './actions/sessionActions';
import { clearStatuses } from './actions/communicationActions';

function App({ location, history }) {
  const [collapsibleNavIsExpanded, setCollapsibleNavIsExpanded] = useState(
    false
  );
  const [authModalPosition, setAuthModalPosition] = useState();

  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  useEffect(() => {
    const unlisten = history.listen(() => {
      store.dispatch(clearStatuses());
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <Provider store={store}>
      <Navbar
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        toggleCollapsibleNav={() =>
          setCollapsibleNavIsExpanded(!collapsibleNavIsExpanded)
        }
        setAuthModalPosition={setAuthModalPosition}
      />
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/posts/:postSlug" component={Post} />
        <Route path="/authors/:authorSlug" component={Author} />
        <Route
          exact
          path="/add-post"
          render={props => (
            <AddPost
              {...props}
              openLogin={() => setAuthModalPosition('login')}
            />
          )}
        />
        <Route
          exact
          path="/edit-posts"
          render={props => (
            <EditPosts
              {...props}
              openLogin={() => setAuthModalPosition('login')}
            />
          )}
        />
        <Route
          exact
          path="/edit-posts/:postSlug"
          render={props => (
            <EditPost
              {...props}
              openLogin={() => setAuthModalPosition('login')}
            />
          )}
        />
        <Route exact path="/about" component={About} />
        <Route component={Error404} />
      </Switch>
      <Footer />
      <AddPostOverlay />
      {authModalPosition && (
        <Modal handleClose={() => setAuthModalPosition()}>
          <AuthValidator
            authModalPosition={authModalPosition}
            setAuthModalPosition={setAuthModalPosition}
            handleClose={() => setAuthModalPosition()}
          />
        </Modal>
      )}
    </Provider>
  );
}

export default withRouter(App);

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

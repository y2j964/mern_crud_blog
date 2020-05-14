import React, { useState, useEffect, lazy, Suspense } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import AuthValidator from './components/AuthValidator';
import AddPostOverlay from './components/AddPostOverlay';
import Spinner from './icons/Spinner';
import Home from './pages/Home';
import Author from './pages/Author';
import About from './pages/About';
import AddPost from './pages/AddPost';
import EditPosts from './pages/EditPosts';
import EditPost from './pages/EditPost';
import Error404 from './pages/Error404';
import store from './store';
import { getUser } from './actions/sessionActions';
import { getPosts } from './actions/postActions';
import AuthDropdown from './components/AuthDropdown/AuthDropdown';
import ScrollToTop from './components/ScrollToTop';

const Post = lazy(() => import('./pages/Post'));
const PostPreview = lazy(() => import('./pages/PostPreview'));

function App({ location }) {
  const [authModalPosition, setAuthModalPosition] = useState();

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(getPosts());
  }, []);

  return (
    <Provider store={store}>
      <ScrollToTop />
      <Navbar setAuthModalPosition={setAuthModalPosition}>
        <AuthDropdown setAuthModalPosition={setAuthModalPosition} />
      </Navbar>
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route
          path="/posts/:postSlug"
          render={props => (
            <Suspense
              fallback={
                <main>
                  <Spinner />
                </main>
              }
            >
              <Post {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/post-preview"
          render={props => (
            <Suspense
              fallback={
                <main>
                  <Spinner />
                </main>
              }
            >
              <PostPreview {...props} />
            </Suspense>
          )}
        />
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
          path="/edit-posts/:id"
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
      <CSSTransition
        in={!!authModalPosition}
        timeout={{ enter: 150, exit: 300 }}
        unmountOnExit
        classNames="fade"
      >
        <Modal
          isOpen={!!authModalPosition}
          handleClose={() => setAuthModalPosition()}
        >
          <AuthValidator
            authModalPosition={authModalPosition}
            setAuthModalPosition={setAuthModalPosition}
            handleClose={() => setAuthModalPosition()}
          />
        </Modal>
      </CSSTransition>
    </Provider>
  );
}

export default withRouter(App);

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

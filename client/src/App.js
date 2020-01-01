import React, { useState } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal';
import Login from './components/Login';
import Register from './components/Register';
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

function App({ location, history }) {
  const [collapsibleNavIsExpanded, setCollapsibleNavIsExpanded] = useState(
    false
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <Provider store={store}>
      <Navbar
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        toggleCollapsibleNav={() =>
          setCollapsibleNavIsExpanded(!collapsibleNavIsExpanded)
        }
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/posts/:slug" component={Post} />
        <Route path="/authors/:slug" component={Author} />
        <Route exact path="/add-post" component={AddPost} />
        <Route exact path="/edit-posts" component={EditPosts} />
        <Route path="/edit-posts/:postSlug" component={EditPost} />
        <Route exact path="/about" component={About} />
        <Route component={Error404} />
      </Switch>
      <Footer />
      <AddPostOverlay />
      {isLoginModalOpen && (
        <Modal handleClose={() => setIsLoginModalOpen(false)}>
          <Login />
        </Modal>
      )}
      {isRegisterModalOpen && (
        <Modal handleClose={() => setIsRegisterModalOpen(false)}>
          <Register />
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
// import React, { useState } from 'react';
// import { withRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import PropTypes from 'prop-types';
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// import Modal from './components/Modal';
// import AddPostOverlay from './components/AddPostOverlay';
// import Home from './pages/Home';
// import Post from './pages/Post';
// import Author from './pages/Author';
// import About from './pages/About';
// import AddPost from './pages/AddPost';
// import EditPosts from './pages/EditPosts';
// import Error404 from './pages/Error404';
// import store from './store';

// function App({ location, history }) {
//   const [collapsibleNavIsExpanded, setCollapsibleNavIsExpanded] = useState(
//     false
//   );
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

//   return (
//     <Provider store={store}>
//       <Navbar
//         collapsibleNavIsExpanded={collapsibleNavIsExpanded}
//         toggleCollapsibleNav={() =>
//           setCollapsibleNavIsExpanded(!collapsibleNavIsExpanded)
//         }
//       />
//       <Switch location={location}>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/posts/:slug" component={Post} />
//         <Route exact path="/authors/:slug" component={Author} />
//         <Route exact path="/add-post" component={AddPost} />
//         <Route exact path="/edit-posts" component={EditPosts} />
//         <Route exact path="/about" component={About} />
//         <Route component={Error404} />
//       </Switch>
//       <Footer />
//       <AddPostOverlay />
//       <Modal isOpen={isLoginModalOpen}>
//         <Login />
//       </Modal>
//       <Modal isOpen={isRegisterModalOpen}>
//         <Register />
//       </Modal>
//     </Provider>
//   );
// }

// export default withRouter(App);

// App.propTypes = {
//   location: PropTypes.object,
//   history: PropTypes.object,
// };

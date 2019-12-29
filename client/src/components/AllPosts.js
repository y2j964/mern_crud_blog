import React, { useState, useEffect } from 'react';
import { getPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import WithLoadingIndicator from './WithLoadingIndicator';

function AllPosts({ getPosts, children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [getPosts]);

  return <WithLoadingIndicator isLoading={isLoading} render={() => children} />;
}

export default connect(null, { getPosts })(AllPosts);

import React from 'react';
import { Link } from 'react-router-dom';
import Plus from '../icons/Plus';

function AddPostOverlay() {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <Link
        to="/add-post"
        className="rounded-full bg-gray-200 z-10 h-12 w-12 flex justify-center items-center"
      >
        <Plus fill="#7300e6" />
      </Link>
    </div>
  );
}

export default AddPostOverlay;

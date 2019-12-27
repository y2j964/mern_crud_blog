import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Close from '../icons/Close';

export default function Modal() {
  return (
    <div className="absolutely-centered bg-alpha z-10">
      <div
        role="dialog"
        className="max-w-sm sm:max-w-md md:max-w-lg w-full px-12 pt-6 pb-12 rounded bg-white relative"
      >
        <button className="absolute right-0 top-0 p-4" aria-label="close modal">
          <Close fill="black" />
        </button>
        <Login />
        {/* <Register /> */}
      </div>
    </div>
  );
}

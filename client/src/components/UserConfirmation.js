// custom ui for react-router-dom Prompt
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal/Modal';
import Dialog from './Modal/Dialog';

export default function UserConfirmation({ message, callback }) {
  const [isHidden, setIsHidden] = useState();

  useEffect(() => {
    setIsHidden(false);
  }, [callback]);

  const closeModal = callbackState => {
    setIsHidden(true);
    callback(callbackState);
  };

  if (isHidden) {
    return null;
  }

  return (
    <Modal handleClose={() => closeModal(false)}>
      <Dialog handleClose={() => closeModal(false)}>
        <div className="mt-6 z-10">
          <h2 className="font-bold text-2xl text-center mb-5" id="modalHeading">
            Leaving Page
          </h2>
          <p className="mb-5 text-center">{message}</p>
          <div className="flex justify-around">
            <button
              className="accent-btn w-24 bg-gray-300 text-black"
              onClick={() => closeModal(false)}
            >
              No
            </button>
            <button
              className="accent-btn w-24 bg-gray-300 text-black"
              onClick={() => closeModal(true)}
            >
              Yes
            </button>
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}

UserConfirmation.propTypes = {
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

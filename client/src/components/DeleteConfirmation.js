import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

function DeleteConfirmation({ onClose, id, deletePost }) {
  return (
    <Modal handleClose={onClose}>
      <div className="mt-6 z-10">
        <h2 className="font-bold text-2xl text-center mb-5" id="modalHeading">
          Confirm Delete
        </h2>
        <p className="mb-5 text-center">
          This action is irreversible. Are you sure you want to delete this
          post?
        </p>
        <div className="flex justify-around">
          <button className="accent-btn w-24 bg-gray-500" onClick={onClose}>
            Cancel
          </button>
          <button
            className="accent-btn w-24 bg-red-600"
            onClick={() => {
              deletePost(id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};

export default DeleteConfirmation;

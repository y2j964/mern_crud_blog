import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal/Modal';
import Dialog from './Modal/Dialog';

function DeleteConfirmation({ onClose, deletePost }) {
  return (
    <Modal handleClose={onClose}>
      <Dialog handleClose={onClose}>
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
                deletePost();
                onClose();
              }}
              data-testid='finalize delete'
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default DeleteConfirmation;

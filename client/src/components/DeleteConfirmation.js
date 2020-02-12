import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal/Modal';
import Dialog from './Modal/Dialog';
import { DangerButton, NeutralButton } from './Button/Button';

function DeleteConfirmation({ handleClose, deletePost }) {
  return (
    <Modal isOpen={true} handleClose={handleClose}>
      <Dialog handleClose={handleClose}>
        <div className="mt-6 z-10">
          <h2 className="font-bold text-2xl text-center mb-5" id="modalHeading">
            Confirm Delete
          </h2>
          <p className="mb-5 text-center">
            This action is irreversible. Are you sure you want to delete this
            post?
          </p>
          <div className="flex justify-around">
            <NeutralButton handleClick={handleClose}>Cancel</NeutralButton>
            <DangerButton
              handleClick={() => {
                deletePost();
                handleClose();
              }}
              dataTestId="finalize delete"
            >
              Delete
            </DangerButton>
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default DeleteConfirmation;

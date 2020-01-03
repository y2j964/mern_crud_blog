import React from 'react';
import Modal from '../components/Modal';

export default function ConfirmationAlert() {
  return (
    <div className="p-4">
      <h2
        className="text-3xl text-center w-full font-bold mb-4"
        id="modalHeading"
      >
        Confirm Delete
      </h2>
      <p className="mb-5">
        This action is irreversible. Are you sure you want to delete?
      </p>
      <div className="flex justify-around">
        <button className="accent-btn bg-gray-200 text-black">Cancel</button>
        <button className="accent-btn bg-red-600">Delete</button>
      </div>
    </div>
  );
}

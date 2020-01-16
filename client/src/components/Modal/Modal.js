/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// dialog should allow user to close with escape key

import React, { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default function Modal({ handleClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    disableBodyScroll(modalRef.current);
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  const handleKeyDown = e => {
    const key = e.key || e.code;
    if (key !== 'Escape') {
      return;
    }
    handleClose();
  };

  return (
    <FocusLock returnFocus={{ preventScroll: false }}>
      <div
        className="modal"
        ref={modalRef}
        onKeyDown={handleKeyDown}
        aria-modal="true"
        aria-labelledby="modalHeading"
        role="dialog"
      >
        {children}
      </div>
    </FocusLock>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// // dialog should allow user to close with escape key

// import React, { useEffect, useRef } from 'react';
// import FocusLock, { AutoFocusInside } from 'react-focus-lock';
// import PropTypes from 'prop-types';
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// import Close from '../icons/Close';

// export default function Modal({ handleClose, children }) {
//   const modalRef = useRef();

//   useEffect(() => {
//     disableBodyScroll(modalRef.current);
//     return () => {
//       clearAllBodyScrollLocks();
//     };
//   }, []);

//   const handleKeyDown = e => {
//     const key = e.key || e.code;
//     if (key !== 'Escape') {
//       return;
//     }
//     handleClose();
//   };

//   return (
//     <FocusLock returnFocus={{ preventScroll: false }}>
//       <div
//         className="absolutely-centered bg-alpha z-10"
//         ref={modalRef}
//         onKeyDown={handleKeyDown}
//         aria-modal="true"
//         aria-labelledby="modalHeading"
//         role="dialog"
//       >
//         <div className="max-w-sm sm:max-w-md md:max-w-lg w-full px-12 pt-6 pb-12 rounded bg-white relative">
//           <AutoFocusInside>
//             <button
//               className="absolute right-0 top-0 p-4"
//               aria-label="close modal"
//               onClick={handleClose}
//             >
//               <Close fill="black" />
//             </button>
//           </AutoFocusInside>
//           {children}
//         </div>
//       </div>
//     </FocusLock>
//   );
// }

// Modal.propTypes = {
//   handleClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

// frontend/src/components/LoginFormModal/index.js
import React from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage'

function SignUpFormModal({showSignUpModal, setShowSignUpModal}) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Sign Up</button> */}
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignupFormPage showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;

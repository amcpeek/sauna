// frontend/src/components/LoginFormModal/index.js
import React from 'react';
import { Modal } from '../../context/Modal'
import LoginForm from './LoginForm'

function LoginFormModal({showLogInModal, setShowLogInModal}) {
    console.log('getting to LoginFormModal.index', showLogInModal)


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowLogInModal(true)}>Log In</button> */}
      {showLogInModal && (
        <Modal onClose={() => setShowLogInModal(false)}>
          <LoginForm  showLogInModal={showLogInModal} setShowLogInModal={setShowLogInModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

import React from 'react';
import { Modal } from '../../context/Modal'
import EditProject from './EditProject';

function EditProjectModal({showModal, setShowModal}) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Project</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProject  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditProjectModal;

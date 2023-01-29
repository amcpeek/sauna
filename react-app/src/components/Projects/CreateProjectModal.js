import React from 'react';
import { Modal } from '../../context/Modal'
import CreateProject from './CreateProject';

function CreateProjectModal({showModal, setShowModal}) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Project</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProject  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateProjectModal;

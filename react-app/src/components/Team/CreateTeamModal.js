import React from 'react';
import { Modal } from '../../context/Modal'
import CreateTeam from './CreateTeam';

function CreateTeamModal({showModal, setShowModal}) {


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Team</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateTeam  showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateTeamModal;

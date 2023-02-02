import React from 'react';
import { Modal } from '../../context/Modal'
import EditTeam from './EditTeam';

function EditTeamModal({showModal, setShowModal, sentTeamId}) {
  console.log('in EditTeamModal', sentTeamId)


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Team</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditTeam  showModal={showModal} setShowModal={setShowModal} sentTeamId={sentTeamId}/>
        </Modal>
      )}
    </>
  );
}

export default EditTeamModal;

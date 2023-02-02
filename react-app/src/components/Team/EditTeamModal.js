import React from 'react';
import { Modal } from '../../context/Modal'
import EditTeam from './EditTeam';

function EditTeamModal({showTModal, setShowTModal, sentTeamId}) {
  console.log('in EditTeamModal', sentTeamId)


  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowModal(true)}>Create New Team</button> */}
      {showTModal && (
        <Modal onClose={() => setShowTModal(false)}>
          <EditTeam  showModal={showTModal} setShowModal={setShowTModal} sentTeamId={sentTeamId}/>
        </Modal>
      )}
    </>
  );
}

export default EditTeamModal;

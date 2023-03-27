import React from "react";
import { Modal } from "../../context/Modal";
import EditTeam from "./EditTeam";

function EditTeamModal({ showTModal, setShowTModal, sentTeamId }) {
  //  console.log('in EditTeamModal', sentTeamId)

  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowTModal(true)}>Create New Team</button> */}
      {showTModal && (
        <Modal onClose={() => setShowTModal(false)}>
          <EditTeam
            showTModal={showTModal}
            setShowTModal={setShowTModal}
            sentTeamId={sentTeamId}
          />
        </Modal>
      )}
    </>
  );
}

export default EditTeamModal;

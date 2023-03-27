import React from "react";
import { Modal } from "../../context/Modal";
import CreateTeam from "./CreateTeam";

function CreateTeamModal({ showTModal, setShowTModal }) {
  return (
    <>
      {/* <button className='dropButtonNav' onClick={() => setShowTModal(true)}>Create New Team</button> */}
      {showTModal && (
        <Modal onClose={() => setShowTModal(false)}>
          <CreateTeam showTModal={showTModal} setShowTModal={setShowTModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateTeamModal;

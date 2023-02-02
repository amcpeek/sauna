
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from '../auth/LoginFormModal'
import SignUpFormModal from '../auth/SignUpFormModal'
import CreateTeamModal from '../Team/CreateTeamModal';


function TeamButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showTModal, setShowTModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

     document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')

  };

  // const createTeam = () => {
  //   // e.preventDefault()
  //   setShowTModal(true)
  //   alert('open create team')
  // }

  return (
    <div className=''>
      <button onClick={openMenu} className=' just-text-button bg-white pad-1 z-2 cursor'>Teams</button>
      {showMenu && user && (

        <div className="dropdownTeam">
            <button className='just-text-button bg-white cursor'><NavLink exact to="/teams" className='no-und'>All Teams</NavLink></button>

            <button className='just-text-button bg-white cursor'><NavLink exact to="/profile" className='no-und'>Your Teams</NavLink></button>
            {/* <button className='just-text-button bg-white cursor' onClick={() => setShowTModal(true)}>Create Team</button>
            <CreateTeamModal showTModal={showTModal} setShowTModal={setShowTModal}/> */}
        </div>
      )}
              <LoginFormModal showLogInModal={showLogInModal} setShowLogInModal={setShowLogInModal}/>
             <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
      {showMenu && !user && (
        <div className="dropdownTeam">
          <button className='just-text-button bg-white cursor'><NavLink exact to="/teams" className='no-und'>All Teams</NavLink></button>
        </div>

      )}
    </div>
  );
}

export default TeamButton;

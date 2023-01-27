// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from '../LoginFormModal/index'
import SignUpFormModal from '../SignUpFormModal'

//should have 2 conditions:
//1: login & signup
//2: profile & log out


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  //const [showModal, setShowModal] = useState(false);
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

  return (
    <div className='dropdownNav2'>
      <button onClick={openMenu} className='dropButtonNav circle bg-white pad-1 font-small bg-white thin-bor'>
      {/* id="LoginButton" */}
      {/* <i className="material-symbols-outlined">menu</i>
      <i className="material-symbols-outlined"> account_circle</i> */}
      {!user? <div>Get Started</div>: <div className=''>{(user.username).slice(0,1)} {((user.username).slice(1,2)).toUpperCase()}</div>}

      </button>
      {showMenu && user && (

        <div className="dropdownContentNav">

            {/* <button className='dropDownNavButtons roundTopFields'><NavLink exact to="/">View Your Profile</NavLink></button> */}
            <button className='dropDownNavButtons roundBottomFields bg-white round-sq-05 thin-bor' onClick={logout}>Log Out</button>
        </div>
      )}
              <LoginFormModal showLogInModal={showLogInModal} setShowLogInModal={setShowLogInModal}/>
             <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
      {showMenu && !user && (
        <div className="dropdownContentNav">
          {/* <div className={'cursor'} onClick={() => {setShowModal(true)}}>WTF</div> */}
          <button className='bg-white circle thin-bor font-small' onClick={() => setShowLogInModal(true)}>Log In</button>
          <button className=' bg-white circle thin-bor font-small' onClick={() => setShowSignUpModal(true)}>Sign Up</button>


        </div>

      )}
    </div>
  );
}

export default ProfileButton;

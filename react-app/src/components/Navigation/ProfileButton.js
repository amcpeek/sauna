// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import LoginFormModal from '../auth/LoginFormModal'
import SignUpFormModal from '../auth/SignUpFormModal'

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
    <div className=''>
      <button onClick={openMenu} className=' just-text-button bg-white pad-1 z-2 cursor'>
      {/* id="LoginButton" */}
      {/* <i className="material-symbols-outlined">menu</i>
      <i className="material-symbols-outlined"> account_circle</i> */}
      {!user?
      <div className='font-small-med ai-c ' >Get Started</div>:
      // <div className=''>{(user.username).slice(0,1).toUpperCase()} {((user.username).slice(1,2)).toUpperCase()}</div>
      <div className='text-blue'><i className="fa-regular fa-user ai-c"></i></div>
      }

      </button>
      {showMenu && user && (

        <div className="dropdownContentNav">

            <button className='just-text-button bg-white cursor'><NavLink exact to="/profile" className='no-und'>Your Profile</NavLink></button>
            <button className='just-text-button bg-white cursor' onClick={logout}>Log Out</button>
        </div>
      )}
              <LoginFormModal showLogInModal={showLogInModal} setShowLogInModal={setShowLogInModal}/>
             <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
      {showMenu && !user && (
        <div className="dropdownContentNav">
          <button className='just-text-button bg-white cursor' onClick={() => setShowLogInModal(true)}>Log In & Demo User</button>
          <button className='just-text-button bg-white cursor' onClick={() => setShowSignUpModal(true)}>Sign Up</button>


        </div>

      )}
    </div>
  );
}

export default ProfileButton;

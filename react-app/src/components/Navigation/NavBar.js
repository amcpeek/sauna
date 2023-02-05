
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProjectModal';
import CreateTeamModal from '../Team/CreateTeamModal';
import TeamsButton from './TeamsButton';
import saunaLogo from '../../assets/saunaLogo.png'


const NavBar = () => {
  const dispatch = useDispatch()
  const [showTModal, setShowTModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const findProjectTest = async () => {
    const returnUser = await dispatch(authenticate())
  }

  let user = useSelector(state => {return state.session.user})

  useEffect(() => {
    findProjectTest()
 }, [dispatch])

  return (
    <nav>
       <CreateTeamModal showTModal={showTModal} setShowTModal={setShowTModal}/>
       <div className='jc-sb lr-margin vh-5 ai-c '>
              <div className='row ai-c'>

                      <Link to={'/'} className=' l-margin-small row no-und'>

                        <img
                        className='logo'
                        src={saunaLogo}
                        alt='Logo'
                        ></img>
                        <div> &nbsp; Sauna</div>
                      </Link>
                      &nbsp; &nbsp; &nbsp;
                      <TeamsButton user={user}/>
                      &nbsp; &nbsp; &nbsp;
                      <Link to='/whySauna' className='no-und'>Why Sauna?</Link>
                      &nbsp; &nbsp; &nbsp;
                      <a href='https://github.com/amcpeek/sauna/wiki' className='no-und' target="_blank">Features</a>
                      &nbsp; &nbsp; &nbsp;
                      <a href='https://github.com/amcpeek/sauna' className='no-und' target="_blank">Resources</a>

              </div>


              <div className='row'>
                  <div>
                      <a
                      className='text-blue'
                      href='https://www.linkedin.com/in/annika-mcpeek/'
                      target="_blank">
                      <i className="fa-brands fa-linkedin"/>
                      </a>
                      &nbsp; &nbsp; &nbsp;
                      <a
                      className='text-blue'
                      href='https://github.com/amcpeek/'
                      target="_blank">
                      <i className="fa-brands fa-github"/>
                      </a>
                      &nbsp; &nbsp; &nbsp;
                  </div>
                  <div className='row ai-jc width-same'>
                         <ProfileButton user={user}/>
                  </div>
              </div>

            </div>


    </nav>
  );
}

export default NavBar;

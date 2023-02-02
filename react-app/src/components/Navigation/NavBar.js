
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
              <div className='row'>

                      <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                      &nbsp; &nbsp; &nbsp;
                      <div><TeamsButton user={user}/></div>
                      &nbsp; &nbsp; &nbsp;
                      <div ><Link to='/whySauna' className='no-und'>Why Sauna?</Link></div>
                      &nbsp; &nbsp; &nbsp;
                      <div ><a href='https://github.com/amcpeek/sauna/wiki' className='no-und'>Features</a></div>
                      &nbsp; &nbsp; &nbsp;
                      <div><a href='https://github.com/amcpeek/sauna' className='no-und'>Resources</a></div>

              </div>


              <div className='row'>
                  <div>
                      <a
                      href='https://www.linkedin.com/in/annika-mcpeek/'>
                      <i className="fa-brands fa-linkedin"/>
                      </a>
                      &nbsp; &nbsp; &nbsp;
                      <a
                      href='https://github.com/amcpeek/'>
                      <i className="fa-brands fa-github"/>
                      </a>
                      &nbsp; &nbsp; &nbsp;
                  </div>
                  <div className='row ai-jc width-same'>

                      {/* {user &&
                      <div className='ai-c'>
                        <button onClick={() => setShowModal(true)} className='just-text-button bg-white cursor'><i className="fa-solid fa-plus"></i></button>
                        <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>
                      </div>
                      } */}



                      <div>
                         <div> <ProfileButton user={user}/></div>

                      </div>
                  </div>
              </div>

            </div>


    </nav>
  );
}

export default NavBar;

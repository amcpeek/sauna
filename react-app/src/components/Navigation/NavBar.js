
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
import { authenticate } from '../../store/session';
import CreateProjectModal from '../Projects/CreateProject/CreateProjectModal';


const NavBar = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  const findProjectTest = async () => {
    const returnUser = await dispatch(authenticate())
  }

  let user = useSelector(state => {return state.session.user})

  useEffect(() => {
    findProjectTest()
 }, [dispatch])

  return (
    <nav>
       <div className='jc-sb lr-margin'>
              <div className='row'>
                      <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                      &nbsp; &nbsp; &nbsp;
                      <div className='do-not-interact'>Why Sauna?</div>
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
                  <div className='row ai-c'>
                      {user && <button onClick={() => setShowModal(true)} className='just-text-button bg-white'><i className="fa-solid fa-plus"></i></button>}
                      &nbsp; &nbsp; &nbsp;

                      <CreateProjectModal showModal={showModal} setShowModal={setShowModal}/>

                      {/* <div><Link to={`/projects/create`}>Create Project</Link></div> */}
                      <div> <ProfileButton user={user}/></div>
                  </div>
              </div>

            </div>

      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;

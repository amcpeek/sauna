
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <div className='jc-sb border-orange'>
            <div><Link to={'/'}><i className="fa-solid fa-house-chimney"></i></Link></div>
                <div>Why Guava?</div>
                <div><Link to='https://github.com/amcpeek/guava/wiki'>Features</Link></div>
                <div><Link to='https://github.com/amcpeek/guava'>Resources</Link></div>
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
                </div>
                <div><Link to={`/projects/create`}>Create Project</Link></div>
                <div><button>Get Started</button></div>
            </div>

      <ul>
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
      </ul>
    </nav>
  );
}

export default NavBar;

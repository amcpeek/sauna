import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';



const SplashPage = () => {
    return (
        <div>
        <div className='f'>
                        <div className='main-left col main-left lr-margin'>

                            <div className='lr-margin-small col  width-80-per'>
                                <h1>Are silos making teamwork <br/> more painful?</h1>
                                <h4>Sauna, an Asana clone,  helps you manage projects, focus on what's important, <br/> and organize work in one place for seamless collaboration.</h4>
                            </div>


                            <div className='lr-margin-small col width-80-per'>
                                <h1>Stay organized and <br/> connected</h1>
                                <h4>Bring your team's work together in one shared space. Choose the project view that suits your style, and collaborate no matter where you are.</h4>
                            </div>

                            <Link className='cursor text-blue just-no-und ' to='/teams'>
                            <div className='asana-button width-60-per lr-margin-small'>
                                <div className='lr-margin-small col'>
                                <h1>Join our sample company </h1>
                                <h4>Manage teams, projects, and tasks with Sauna </h4>
                                </div>
                            </div>

                            </Link>



                        </div>
       <div className='main-gray-box'>

            <img className='main-img-1'
            src='https://assets.asana.biz/transform/5e1c89aa-e1af-44f5-8902-f692c819c3b2/home-hero-1a'
            alt='home1'
            />
            <img className='main-img-2'
            src='https://assets.asana.biz/transform/efb32754-4aa7-4fd8-ba6f-2d019316dd4a/home-hero-1b'
            alt='home2'
            />
        </div>
        </div>

    </div>

    )
}

export default SplashPage

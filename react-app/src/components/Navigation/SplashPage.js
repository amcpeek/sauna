import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';



const SplashPage = () => {
    return (
        <div>
        <div className='f'>
                        <div className='main-left col main-left lr-margin'>

                            <div>
                                <h1>Are silos making teamwork <br/> more painful?</h1>
                                <h4>Sauna, an Asana clone,  helps you manage projects, focus on what's important, <br/> and organize work in one place for seamless collaboration.</h4>
                                <h4>Join one of the many teams working on projects on Sauna </h4>
                                <h4>Join our sample company managing teams and projects with Sauna </h4>
                                    <Link to='/teams'>Discover Teams</Link>
                            </div>

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

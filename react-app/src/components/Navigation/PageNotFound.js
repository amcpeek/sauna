import { Link } from "react-router-dom"
import kingsSauna from '../../assets/kingsSauna.JPG'
import KemiSauna3 from '../../assets/KemiSauna3.png'

function PageNotFound() {
    return (
        <div className="lost-sauna-img" style={{ backgroundImage: `url(${KemiSauna3})` }}>
        {/* <div className='overlap-img max-width-90em tb-margin col'>
       <p>In my family building a sauna at our cabin <a href='https://mcpeek-airbnb.onrender.com/spots/5' className=''>featured in my AirBnb clone</a>
       &nbsp;has for ages been a group project we are perpetually planning, but with the many moving logistics and involved teams we have not been
       able to complete it. But with an app like Sauna, group passion projects can become a reality.</p>
       <p className='width-50em'>Planning group backpacking trips is also a passion of mine. Featured here is a sauna on a backpacking trip through Swedish Lapland
            on the <a href="https://visitsweden.com/where-to-go/northern-sweden/swedish-lapland/kings-trail-kungsleden/#:~:text=The%20King's%20Trail%2C%20also%20known,the%20length%20of%20your%20hike." className=''>King's Trail.</a>
       </p>
       </div> */}
       <div className='kemi-box'>

        This page does not exist...
        but this amazing sauna does!
        My husband's family built it on an island
        off the coast of Finland.



       </div>

  </div>

    )
}

export default PageNotFound

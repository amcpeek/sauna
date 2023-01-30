import { Link } from "react-router-dom"
import kingsSauna from '../../assets/kingsSauna.JPG'

const WhySauna = () => {
    return (
        <div className="why-sauna-img" style={{ backgroundImage: `url(${kingsSauna})` }}>
              <div className='overlap-img'>
             <p>In my family building a sauna at our cabin <a href='https://github.com/amcpeek/sauna/wiki' className=''>featured in my AirBnb clone</a>
             &nbsp;has for ages been a group project we are perpetually planning, but with the many moving logistics and involved teams we have not been
             able to complete it. But with an app like Sauna, group passion projects can become a reality.</p>
             <p className='width-50em'>Planning group backpacking trips is also a passion of mine. Featured here is a sauna on a backpacking trip through Swedish Lapland
                  on the <a href="https://visitsweden.com/where-to-go/northern-sweden/swedish-lapland/kings-trail-kungsleden/#:~:text=The%20King's%20Trail%2C%20also%20known,the%20length%20of%20your%20hike." className=''>King's Trail.</a>
             </p>
             </div>

        </div>

        // <div className="why-sauna-img" style={{ backgroundImage: `url("https://i.imgur.com/gzsd5FZ.jpg")` }}></div>

//         <div className='wh-100 margin-0'>
// {/*
//             <div className="why-sauna-img" style={{ backgroundImage: `url("${kingsSauna}")` }}></div> */}
//             <div className="why-sauna-img" style={{ backgroundImage: `url(${kingsSauna})` }}></div>
//             {/* <img
//             className="why-sauna-img margin-0"
//             src='https://i.imgur.com/gzsd5FZ.jpg'
//             alt='Sauna in the Swedish Tundra'
//             /> */}


//             <div className='overlap-img'>
//             <p>In my family building a sauna at our cabin <a href='https://github.com/amcpeek/sauna/wiki' className=''>featured in my AirBnb clone</a>
//             &nbsp;has for ages been a group project we are perpetually planning, but with the many moving logistics and involved teams we have not been
//             able to complete it. But with an app like Sauna, group passion projects can become a reality.</p>
//             <p className='width-50em'>Planning group backpacking trips is also a passion of mine. Featured here is a sauna on a backpacking trip through Swedish Lapland
//                  on the <a href="https://visitsweden.com/where-to-go/northern-sweden/swedish-lapland/kings-trail-kungsleden/#:~:text=The%20King's%20Trail%2C%20also%20known,the%20length%20of%20your%20hike." className=''>King's Trail.</a>
//             </p>
//             </div>
//        </div>
    )
}


export default WhySauna




            // not working

            // <div className="why-sauna-img" style={{ backgroundImage: "url('https://i.imgur.com/gzsd5FZ.jpg')" }}>

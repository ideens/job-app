import axios from "axios";
import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactMapGl, { Marker, Popup }from 'react-map-gl'
// import locationData from "../data/location.js";




const Simplemap = ({_id}) => {

 const [coords, setCoords] = useState([])
 const [postId, setPostId] = useState()
 const navigate = useNavigate()
 useEffect(() => {
     async function getGeoCode() {
         
         const { data } = await axios.get('/api/posts')
         const posts = data
         console.log('pooosttssssss--->', posts)
         console.log('posts----->Yesss', posts[0].location)
         // locationData.map((postcode) => {
             //     return response
             
             // }
             // )
             // const locationArray = []
             // locationArray.push(locationData[0].location)
             // locationArray.push(locationData[1].location)
             
             // console.log(locationArray)
             const newCoords = []
             const posting = []
             for(let i = 0; i < posts.length; i++){ 
                 const location = posts[i].location
                 const id = posts[i]._id
                 console.log('locationssss--->', location)
                 console.log('idddd----->', id)
                 
                 // const location = locationData[i].location
                 // const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWxhMTYxMDkyIiwiYSI6ImNrdnk1YWlscTBieXkyb25vdGtscTlycG4ifQ.0SGjJmbbe5el1-k2qeBXnQ`)
                 // const longlat = Object.values(response.data.features[0].geometry.coordinates)
                 const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=39b07783561747b1b301c84b5e602c31&language=en&pretty=1`)
                 console.log(response.data.results[0].geometry)
                 const longlat = response.data.results[0].geometry
      
                 console.log('testinggg---->', longlat, id)
                 const complete = {...longlat, id}
                 console.log('i like this', complete)
                 
                 newCoords.push(complete)
                 posting.push(id)
                 
                 
                 
                 //     // console.log(location)
                 //     // const complete = {longlat}
                 //     // coords.push(complete)
                 //     // const coords = Object.values(combs)
                 //     // console.log('longlats---->', longlats)
                 //     // const combsArray = combs.map(value => [value.long, value.lat])
                 //     // console.log('combarray --->',combsArray)
                 //     // const final = {combs}
                 //     // const both = response.data.features[0].geometry.coordinates
                 //     // console.log('both -->', both)
                 //     // const lon = response.data.features[0].geometry.coordinates[0]
                 //     // // const lat = response.data.features[0].geometry.coordinates[1]
                 //     // console.log('lat--->', combs[0])
                 //     // console.log('lng--->', combs[1])
                 
                 //     // // coords.push(longlats)
                 //     // console.log('combs--->', combs)
                 
                 //     // console.log('final --->', final)
                 
                 //     // console.log('coords -->', coords)
                 //     // console.log('coords --->', coords)
                 
                 //     console.log('cooords--->', coords)
                }
                setCoords(newCoords)
                setPostId(posting)
                console.log('cooords--->', newCoords)
                // console.log('latty--->', coords[0].lat)
                
                // console.log('dasdas--->', coords[0].combs.lat)
                
                
                // setLongitude(response.data.features[0].geometry.coordinates[0])
                // setLatitude(response.data.features[0].geometry.coordinates[1])
            }
            getGeoCode()
            
        }, [])
        
        const [viewPort, setViewPort] = useState({
            latitude: 51.5072,
            longitude: 0.1276,
            zoom: 10,
        })

        const [popup, setPopUp] = useState(null)
        
  
            const handleClick = () => {
                console.log('click')
                navigate(`/landing/${postId}`)
    
            }
      
      

        return (
        <div className="map-container">
        <ReactMapGl
            mapboxApiAcessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            height='90%'
            width='100%'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            {...viewPort}
            onViewStateChange={viewPort => setViewPort(viewPort)}
    
        >
        
        {coords.length && coords.map((coord, i) => {
            console.log('coordssssss____>', coord.lat)
               return(
                     <Marker key={i} latitude={coord.lat} longitude={coord.lng}>
                     <span onClick={() => setPopUp(coord)}>
                         🧑‍💻
                    </span> 
                    <Link className='links' to={{ pathname: `/landing/${coord.id}`}}>  Find My Post</Link>
                     
                 </Marker>
               )    
               //     coord.combs.lat
               //     console.log('neww--->', coord.combs.lat)
               // //  coord.combs.lng
               
            
            })} 
            <div className='popup-conatiner'>
            {popup &&  
            <Popup
            latitude={popup.lat} 
            longitude={popup.lng}
            closeOnClick={true}
            onClose={() => setPopUp(null)}
            >
            {postId.map(id =>
         
                <div className='popup' onClick={handleClick}>
                
              
              
                
                </div>
            )}
            </Popup>
            

                
            //     <div className='popup'>
            //     <Link to={`/landing/${_id}`}>
            //     Find My Posts
            //     </Link>
            //   </div>
                
                }
            </div>
      
      
        </ReactMapGl>
        </div>
    )
}

export default Simplemap
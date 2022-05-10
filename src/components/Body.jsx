import React, {useEffect, useState } from "react";
import './body.css';
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import axios from "axios";
import L from 'leaflet';
import arrow from '../assets/images/icon-arrow.svg'
import locationIcon from '../assets/images/icon-location.svg'

//import { Handler } from "leaflet";


const Body = () => {

  const [info, setInfo] = useState({});
  const [query, setQuery] = useState('')
  const [isFetched, setIsFetched]= useState(false)
  
  const url = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_KEY}&ipAddress=${query}`    
     
    useEffect(()=> {
      axios.get(url)
      .then(function (response) {
        // handle success
        setInfo(response.data);
        setIsFetched(true)
        setQuery('')
        
      })
      .catch(function (response) {
        // handle error
      });
      // eslint-disable-next-line
     }, [ ])


     const fetcher = (e) => {
        axios.get(url)
      .then(function (response) {
        // handle success
        setInfo(response.data);
        setIsFetched(true)
        setQuery(response.data.ip)
        
      })
      .catch(function (error) {
        // handle error
        
      });
     }

   
    const handleChange =(e)=> {
      setQuery(e.target.value)
    }

    const handleKeyDown = (e) => {
      if(e.key === 'Enter') {
        e.preventDefault();
        fetcher();
      }
      
    }
    let icon = L.icon({
      iconUrl: locationIcon,
      iconRetinaUrl: locationIcon,
      iconAnchor: [5, 55],
      popupAnchor: [10, -44],
      iconSize: [40, 50],
    });

    return (
      <div >
        <div className="input-container">
          <div className="container">
              <h1>IP Address Tracker</h1><form className="input">
              <input
                type ='text'
                placeholder="Search for any IP address"
                onChange={handleChange}
                
                onKeyDown={handleKeyDown}
                value={query}
                
              />
              <button type='button'  onClick={fetcher} ><img src={arrow} alt='arrow'/></button>
            </form>
             {  isFetched && <div className="info">
              <p className="first"><span>IP ADDRESS </span><br/>{info.ip}</p>
              <p><span>LOCATION</span><br/>{info.location.city}</p>
              <p><span>TIMEZONE</span><br/>UTC {info.location.timezone}</p>
              <p><span>ISP</span><br/>{info.isp}</p>
            </div>}
          </div>
          
        </div>
      

          <div className="map">
         {isFetched && <MapContainer center={[info.location.lat, info.location.lng]} zoom={14} style={{width:"100%", height:"100%", marginTop:'15%'}} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[info.location.lat, info.location.lng]} icon={icon}>
              <Popup></Popup>
            </Marker>
          </MapContainer>}
        
        </div>
      </div>
       
      );
}
 
export default Body;
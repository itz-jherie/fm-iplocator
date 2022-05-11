import React, {useEffect, useState } from "react";
import './body.css';
import axios from "axios";
import arrow from '../assets/images/icon-arrow.svg'
import Map from "./Map";

//import { Handler } from "leaflet";


const Body = () => {

  const [info, setInfo] = useState({});
  const [query, setQuery] = useState('')
  const [isFetched, setIsFetched]= useState(false);
  const [location, setLocation] = useState([])
  
  const url = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_KEY}&ipAddress=${query}`    
     
    useEffect(()=> {
      axios.get(url)
      .then(function (response) {
        // handle success
        setInfo(response.data);
        setIsFetched(true)
        setQuery('')
        setLocation([response.data.location.lat, response.data.location.lng])
        
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
        setLocation([response.data.location.lat, response.data.location.lng])
        
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
              <p><span>LOCATIeON</span><br/>{info.location.city}</p>
              <p><span>TIMEZONE</span><br/>UTC {info.location.timezone}</p>
              <p><span>ISP</span><br/>{info.isp}</p>
            </div>}
          </div>
          
        </div>
      

          <div className="map">
         {isFetched && <Map location={location}/> }
        
        </div>
      </div>
       
      );
}
 
export default Body;
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import locationIcon from '../assets/images/icon-location.svg'
import L from 'leaflet';



const Map = (props) => {

    function ChangeView({ center, zoom}) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
       let icon = L.icon({
      iconUrl: locationIcon,
      iconRetinaUrl: locationIcon,
      iconAnchor: [5, 55],
      popupAnchor: [10, -44],
      iconSize: [40, 50],
    });
    return ( 
        <MapContainer center={props.location} zoom={3} style={{width:"100%", height:"100%"}} scrollWheelZoom={false}>
            <ChangeView center={props.location} zoom={14}/>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.location} icon={icon}>
              <Popup></Popup>
            </Marker>
          </MapContainer>
     );
}
 
export default Map;
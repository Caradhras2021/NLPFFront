import GoogleMapReact, { Coords } from 'google-map-react';
import { Acquisition } from './Table';

/* eslint-disable */

const mapStyles = {
  width: '100%',
  height: '100vh',
};

function CustomMap ({ data, elt }: { data: Acquisition[], elt: Acquisition }): JSX.Element {

  let latitude = elt.lat;
  let longitude = elt.lng;

  const renderMarkers = (map: any, maps: any) => {
   if (data)
   data.forEach((elt: Acquisition) => {
    let marker = new maps.Marker({
      position: { lat: elt.lat, lng: elt.lng },
      map,
      title: elt.address,
      label: elt.value,
      });
      return marker;
   }
  )};

  const center: Coords = { lat: latitude, lng: longitude }
 
  return (
    <div style={{ height: '75vh', width: '100%' }}>
     <GoogleMapReact
       bootstrapURLKeys={{ key: 'SECRET_KEY' }}
       defaultCenter={center}
       defaultZoom={16}
       yesIWantToUseGoogleMapApiInternals
       onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
     >
     </GoogleMapReact>
    </div>
  );
 };

export default CustomMap;

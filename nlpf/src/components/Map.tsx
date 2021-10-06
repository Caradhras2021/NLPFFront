import React, { Component } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { useParams } from 'react-router-dom';
import { Acquisition } from './Table';

/* eslint-disable */

const mapStyles = {
  width: '100%',
  height: '100vh',
};

function CustomMap ({ data }: { data: Acquisition[] }): JSX.Element {

  let { lat, lng }: { lat: string, lng: string} = useParams();
  let latitude = Number(lat);
  let longitude = Number(lng);

  const renderMarkers = (map: any, maps: any) => {
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
    <div style={{ height: '85vh', width: '100%' }}>
     <GoogleMapReact
       bootstrapURLKeys={{ key: 'AIzaSyC1zyS-6_FRlCKwMnPPtqj3IYwiJLOJZXE' }}
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

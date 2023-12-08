import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";


interface MapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const Maps = withGoogleMap(({ coordinates }: MapProps) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={coordinates}
  >
    <Marker position={coordinates} />
  </GoogleMap>
));

export default function MapComponent({ coordinates }: MapProps) {
  return (
    <Maps
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      coordinates={coordinates}
    />
  );
}
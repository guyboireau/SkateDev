import { useLocation } from 'react-router-dom';

const Park = () => {
  const location = useLocation();
  const park = location.state.skatepark;
  console.log(park)


  return (
    <div>
      <h1>SkatePark</h1>
      {park && (
        <div>
          <h2>{park.properties.PARKNAME}</h2>
          <p>Adress : {park.properties.PARKADDRESS}</p>
          <p>Type : {park.properties.FACILITY_TYPE}</p>
          <p>Contrôle d'accès : {park.properties.ACCESSCTRL}</p>
          <p>Accessible : {park.properties.ACCESSIBLE}</p>
          {/* <p>Date de modification : {new Date(park.properties.MODIFIED_DATE).toLocaleDateString()}</p> */}
          <p>Date de création : {new Date(park.properties.CREATED_DATE).toLocaleDateString()}</p> 
          <p>Facilité : {park.properties.FACILITY}</p>
          <p>Description : {park.properties.DESCRIPTION}</p>
          <p>Nom du parc : {park.properties.PARKNAME}</p>
          <p>Coordonnées : {park.geometry.coordinates[0]}, {park.geometry.coordinates[1]}</p>
        
        </div>
      )}
    </div>
  );
};

export default Park;
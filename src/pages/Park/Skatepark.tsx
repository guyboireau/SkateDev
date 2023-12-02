import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router'
import '../../css/Skatepark.css';

const Skatepark = () => {
  const [skateparks, setSkateparks] = useState([]);
  const navigate = useNavigate()



  const handleClick = (skatepark:any) => {
    navigate(`/park/${skatepark.properties.OBJECTID}`, { state: { skatepark } });
  };
  useEffect(() => {
    fetch('https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson')
      .then(response => response.json())
      .then(data => setSkateparks(data.features))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Liste des skateparks</h1>
      <ul className="skatepark-list">
      {skateparks.map((skatepark: any) => (
  <li key={skatepark.properties.OBJECTID} className="skatepark-item" onClick={() => handleClick(skatepark)}>
    <h2>{skatepark.properties.PARKNAME}</h2>
    <p>Adress : {skatepark.properties.PARKADDRESS}</p>
    <p>Type : {skatepark.properties.FACILITY_TYPE}</p>
    {/* <button>Description</button> */}
  </li>
))}
      </ul>
    </div>
  );
};

export default Skatepark;

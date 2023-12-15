import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import '../../css/Skatepark.css';

interface Skatepark {
  properties: {
    OBJECTID: number;
    PARKNAME: string;
    PARKADDRESS: string;
    FACILITY_TYPE: string;
  };
}

const Skatepark = () => {
  const [skateparks, setSkateparks] = useState<Skatepark[]>([]);
  const [originalSkateparks, setOriginalSkateparks] = useState<Skatepark[]>([]);

  const navigate = useNavigate()

  const handleSort = (type: string) => {
    const sortedSkateparks = originalSkateparks.filter(skatepark => skatepark.properties.FACILITY_TYPE === type);
    setSkateparks(sortedSkateparks);
  };

  const handleClick = (skatepark: Skatepark) => {
    navigate(`/park/${skatepark.properties.OBJECTID}`, { state: { skatepark } });
  };

  useEffect(() => {
    fetch('https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson')
      .then(response => response.json())
      .then(data => {
        setSkateparks(data.features);
        setOriginalSkateparks(data.features);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Liste des skateparks</h1>
      <div className="skatepark-type">
      <button onClick={() => setSkateparks(originalSkateparks)}>Tous</button>

        <button onClick={() => handleSort('bowl')}>Bowl</button>
        <button onClick={() => handleSort('flat')}>Flat</button>
        <button onClick={() => handleSort('other')}>Other</button>
      </div>
      {/* <button onClick={window.location.reload()} >Tous</button> */}
      <ul className="skatepark-list">
        {skateparks.map((skatepark: Skatepark) => (
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

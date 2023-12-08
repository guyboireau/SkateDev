import { getAuth } from "@firebase/auth";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { Fragment, SetStateAction, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [displayName, setDisplayName] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const [skateparks, setSkateparks] = useState([]);
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/16/query?outFields=*&where=1%3D1&f=geojson')
        
            .then(response => response.json())
            .then(data => {
                const filteredData = data.features.filter((skatepark: { properties: { PARKNAME: string; }; }) => skatepark.properties.PARKNAME.toLowerCase().startsWith(searchName.toLowerCase()));
                setSkateparks(filteredData);
            })
            .catch(error => console.log(error));
            console.log(searchName, skateparks);
    }, [searchName]);

    useEffect(() => {
        if (user) {
            const getUserDoc = async () => {

                const docRef = doc(db, "user", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDisplayName(docSnap.data().name);
                } else {
                    console.log("No such document!");
                }
            };

            getUserDoc();
        }
    }, [user, db]);

    const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchName(event.target.value);  
    }
    return (
        <Fragment>
            <h2>Bienvenue {displayName} sur Skater Report</h2>
            <input
                type="text"
                value={searchName}
                onChange={handleSearchChange}
                placeholder="Rechercher un skatepark"
            />
            <ul className="skatepark-list">
                {skateparks.map((skatepark: any) => (
                    <li key={skatepark.properties.OBJECTID} className="skatepark-item" onClick={() => navigate(`/park/${skatepark.properties.OBJECTID}`, { state: { skatepark } })}>
                        <h2>{skatepark.properties.PARKNAME}</h2>
                        <p>Adress : {skatepark.properties.PARKADDRESS}</p>
                        <p>Type : {skatepark.properties.FACILITY_TYPE}</p>
                        <button>Voir plus</button>
                    </li>
                ))}
            </ul>

        </Fragment>
    )
}

export default Home
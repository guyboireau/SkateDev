import { useLocation } from 'react-router-dom';
import '../../css/Park.css';
import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase';
import { getDoc } from 'firebase/firestore/lite';
import Maps from '../../components/Maps';
import MapComponent from '../../components/Maps';
// import{Maps} from '../../components/Maps';

const Park = () => {
  const location = useLocation();
  const park = location.state.skatepark;
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [userName, setUserName] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const CommentRef = collection(db, "commentaire");
  // const coordinate = { lat: park.geometry.coordinates[0], lng: park.geometry.coordinates[1] };


  const OnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    addComment()
  }

  const addComment = async () => {
    if (user)
      await addDoc(CommentRef, {
        comment: comment,
        userId: user?.uid,
        parkId: park.properties.OBJECTID,
        date: new Date().toISOString(),
      })
        .then(() => setComment(''))
        .catch(err => console.log(err))
    else {
      console.log('No user is signed in');
    }
  }


  const getName = async (userId: any) => {
    if (user) {
      const docRef = doc(db, "user", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getName(comment.userId);
  }, [comment.userId]);



  useEffect(() => {
    const getUserDoc = async () => {
      const datas = await getDocs(CommentRef)
      const commentget = datas.docs.map(doc => doc.data())
      setComments(commentget);
    }

    getUserDoc();
  }, [])


  return (
    <div className='skatepark-container'>
      <h1>SkatePark</h1>
      {park && (
        <div >
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
          <MapComponent coordinates={{ lat: park.geometry.coordinates[0], lng: park.geometry.coordinates[1] }} />

        </div>
      )}
      <div>
        <h2>Commentaires</h2>
        <form>
          <label>
            Commentaire :
            <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} />
          </label>
          <button onClick={OnSubmit} >Envoyer</button>
        </form>
      </div>
      <div>
        <ul>
          {comments.map((comment: any) => (
            <li key={comment.id}>
              <p>{userName}</p>
              <p>{comment.comment}</p>
              <p>{new Date(comment.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default Park;
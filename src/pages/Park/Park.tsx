import { useLocation } from 'react-router-dom';
import '../../css/Park.css';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase';

const Park = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [averageNote, setAverageNote] = useState(0)
  const [noteValue, setNoteValue] = useState(0);
  const location = useLocation();

  const park = location.state.skatepark;
  const auth = getAuth();
  const user = auth.currentUser;
  const CommentRef = collection(db, "commentaire");
  const userRef = collection(db, "user");
  const NoteRef = collection(db, "note");


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

  const addNote = async (noteValue: number) => {
    if (user) {
      await addDoc(NoteRef, {
        note: noteValue,
        userId: user?.uid,
        parkId: park.properties.OBJECTID,
        date: new Date().toISOString(),
      })
        .catch(err => console.log(err))
    } else {
      console.log('No user is signed in');
    }
  }

  const getAverageNote = async () => {
    const datas = await getDocs(query(NoteRef, where("parkId", "==", park.properties.OBJECTID)));
    const notes = datas.docs.map((note) => note.data().note);
    const average = notes.reduce((a, b) => a + b) / notes.length;
    //1 decimal
    const averageRounded = Math.round(average * 10) / 10;
    return averageRounded;
  }

  useEffect(() => {

    const getUserDoc = async () => {
      const datas = await getDocs(query(CommentRef, where("parkId", "==", park.properties.OBJECTID)));
      const commentget = await Promise.all(datas.docs.map(async (com) => {
        const userDatas = await getDocs(query(userRef, where("userId", "==", com.data().userId)));
        const user = userDatas.docs.map((user) => user.data());
        console.log(user);
        return { ...com.data(), userName: user[0].name, user: user[0] };
      }));
      setComments(commentget as never[]);
    }
    const fetchAverageNote = async () => {
      const average = await getAverageNote();
      setAverageNote(average);
    }
    getUserDoc();
    fetchAverageNote();
  }, [])

  const OnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    addComment()
  }

  return (
    <>
      <div className='skatepark-container'>
        {park && (
          <div className='content'>
            <h2>{park.properties.PARKNAME}</h2>
            <p>Adress : {park.properties.PARKADDRESS}</p>
            <p>Type : {park.properties.FACILITY_TYPE}</p>
            <p>Contrôle d'accès : {park.properties.ACCESSCTRL}</p>
            <p>Accessible : {park.properties.ACCESSIBLE}</p>
            <p>Date de création : {new Date(park.properties.CREATED_DATE).toLocaleDateString()}</p>
            <p>Facilité : {park.properties.FACILITY}</p>
            <p>Description : {park.properties.DESCRIPTION}</p>
            <p>Coordonnées : {park.geometry.coordinates[0]}, {park.geometry.coordinates[1]}</p>
            <h2>Notes</h2>
            <div className='rating'>
              <div>
                <p>0</p>
                <input type="radio" name="star" id="star0" onChange={() => setNoteValue(0)} />
                <label htmlFor="star0"></label>
              </div>
              <div>
                <p>1</p>
                <input type="radio" name="star" id="star1" onChange={() => setNoteValue(1)} />
                <label htmlFor="star1"></label>
              </div>
              <div>
                <p>2</p>
                <input type="radio" name="star" id="star2" onChange={() => setNoteValue(2)} />
                <label htmlFor="star2"></label>
              </div>
              <div>
                <p>3</p>
                <input type="radio" name="star" id="star3" onChange={() => setNoteValue(3)} />
                <label htmlFor="star3"></label>
              </div>
              <div>
                <p>4</p>
                <input type="radio" name="star" id="star4" onChange={() => setNoteValue(4)} />
                <label htmlFor="star4"></label>
              </div>
              <div>
                <p>5</p>
                <input type="radio" name="star" id="star5" onChange={() => setNoteValue(5)} />
                <label htmlFor="star5"></label>
              </div>
            </div>
            <button onClick={() => addNote(noteValue)}>Noter</button>
            <p>Note moyenne : {averageNote}/5</p>
          </div>
        )}
        <div className='content'>
          <h2>Commentaires</h2>
          <form className='commentaire'>
            <label>
              <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} />
            </label>
            <button onClick={OnSubmit} >Envoyer</button>
          </form>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment: any) => (
                <li key={comment.id}>
                  <p>{comment.userName}</p>
                  <p>{comment.comment}</p>
                  <p>{new Date(comment.date).toLocaleDateString()} </p>
                </li>
              ))) : (<p>Aucun commentaire</p>)}
          </ul>
        </div>
      </div>
    </>
  )
};

export default Park;
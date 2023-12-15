import { useLocation } from 'react-router-dom';
import '../../css/Park.css';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../../firebase';
import Note from '../../components/Note';
import Comment from '../../components/Comment';


const Park = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [averageNote, setAverageNote] = useState(0)
  const [noteValue, setNoteValue] = useState(0);
  const [errCom, setErrCom] = useState<string | null>(null);
  const [errNote, setErrNote] = useState<string | null>(null);
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
        .then(() => window.location.reload())
        .catch(err => console.log(err))

    else {
      setErrCom('No user is signed in');
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
        .catch(err => setErrNote(err.message))
          .then(() => window.location.reload());
      } 
      else {
        setErrNote('No user is signed in');
      }  
   
  }

  const getAverageNote = async () => {
    const datas = await getDocs(query(NoteRef, where("parkId", "==", park.properties.OBJECTID)));
    const notes = datas.docs.map((note) => note.data().note);
    const average = notes.reduce((a, b) => a + b) / notes.length;
    const averageRounded = Math.round(average * 10) / 10;
    return averageRounded;
  }

  useEffect(() => {

    const getUserDoc = async () => {
      const datas = await getDocs(query(CommentRef, where("parkId", "==", park.properties.OBJECTID)));
      const commentget = await Promise.all(datas.docs.map(async (com) => {
        const userDatas = await getDocs(query(userRef, where("userId", "==", com.data().userId)));
        const user = userDatas.docs.map((user) => user.data());
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
              <Note value={0} onValueChange={setNoteValue} />
              <Note value={1} onValueChange={setNoteValue} />
              <Note value={2} onValueChange={setNoteValue} />
              <Note value={3} onValueChange={setNoteValue} />
              <Note value={4} onValueChange={setNoteValue} />
              <Note value={5} onValueChange={setNoteValue} />
            </div>
            {errNote && <p style={{ color: 'red' }}>{errNote}</p>}
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
            {errCom && <p style={{ color: 'red' }}>{errCom}</p>}
            <button onClick={OnSubmit} >Envoyer</button>
          </form>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment: any) => (
                <Comment comment={comment} />
              ))) : (<p>Aucun commentaire</p>)}
          </ul>
        </div>
      </div>
    </>
  )
};

export default Park;
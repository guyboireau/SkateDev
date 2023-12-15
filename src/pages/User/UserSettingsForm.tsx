import { useContext, useState } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import { SET_LOADING, UPDATE_USER_INFOS } from '../../reducers/AuthReducer'
import { collection, setDoc } from '@firebase/firestore'
import { doc } from '@firebase/firestore'
import { db } from '../../../firebase'
import { getAuth } from '@firebase/auth'

const UserSettingsForm = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { userInfos } = state
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = collection(db, "user");
    const [bio, setBio] = useState(userInfos.bio)
    const [name, setName] = useState(userInfos.name)

    

    const addUser = async () => {
        if (user) {
            await setDoc(doc(userRef, user.uid), {
                name: name,
                userId: user.uid,
                email: user.email,
                bio: bio,
            })
            .catch(err => console.log(err))
        }
        else {
            console.log('No user is signed in');
        }
    }

    const onSubmit = () => {
        addUser()
        dispatch({
            type: SET_LOADING,
            payload: {
                isLoading: true,
                email: '',
                password: '',
            }
        })

        setTimeout(() => {
            dispatch({
                type: UPDATE_USER_INFOS,
                payload: { name, bio, email: userInfos.email, },
            })
        }, 2000)
    }

    return (
        <div className="user-profile">
            <h1>User informations</h1>

            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div>
                <label>Bio</label>
                <input type="text" value={bio} onChange={e => setBio(e.target.value)}/>
            </div>

            <button onClick={onSubmit}>Edit</button>
        </div>
    )
}

export default UserSettingsForm

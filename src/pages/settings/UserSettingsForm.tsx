import { useContext, useState } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import { LOGOUT, SET_LOADING, UPDATE_USER_INFOS } from '../../reducers/AuthReducer'
import { collection, setDoc } from '@firebase/firestore'
import { doc } from '@firebase/firestore'
import { db } from '../../../firebase'
import { getAuth } from '@firebase/auth'

const UserSettingsForm = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { userInfos } = state
    const [name, setName] = useState('')
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = collection(db, "user");
  

    const [email, setEmail] = useState(userInfos.email)
    const [password, setPassword] = useState(userInfos.password)

    

    const addUser = async () => {
        if (user) {
            await setDoc(doc(userRef, user.uid), {
                name: name,
                userId: user.uid,
            })
            .then(() => setName(''))
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
                payload: { email, password },
            })
        }, 2000)
    }

    return (
        <div>
            <h1>User Settings Form</h1>
            <button onClick={() => dispatch({
                type: LOGOUT,
                payload: undefined
            })}>
                Logout
            </button>

            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <button onClick={onSubmit}>Edit</button>
        </div>
    )
}

export default UserSettingsForm

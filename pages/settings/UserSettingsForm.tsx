import { useContext, useState } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import { LOGOUT, SET_LOADING, UPDATE_USER_INFOS } from '../../reducers/AuthReducer'

const UserSettingsForm = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { userInfos } = state

    const [firstname, setFirstname] = useState(userInfos.firstname)
    const [lastname, setLastname] = useState(userInfos.lastname)
    const [email, setEmail] = useState(userInfos.email)
    const [password, setPassword] = useState(userInfos.password)

    const onSubmit = () => {
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
                payload: { firstname, lastname, email, password },
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
                <label>Firstname</label>
                <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)}/>
            </div>

            <div>
                <label>Lastname</label>
                <input type="text" value={lastname} onChange={e => setLastname(e.target.value)}/>
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

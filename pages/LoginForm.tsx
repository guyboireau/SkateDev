import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../reducers/AuthReducer';


const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    // const dispatch = useDispatch();



    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            if (userCredential.user) {

                setTimeout(() => {
                    // dispatch({ type: LOGIN, payload: userCredential.user })
                    localStorage.setItem('@user', JSON.stringify(userCredential.user))
                    navigate('/')
                }, 2000)
            }
        } catch (error: any) {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === 'auth/wrong-password') {
                setError('Le mot de passe est invalide');
            } else if (errorCode === 'auth/user-not-found') {
                setError("L'email est invalide");
            } else if (errorCode === 'auth/invalid-api-key') {
                setError("La clé API est invalide");
            } else {
                setError('Une erreur est survenue');
            }

        }
    }

    return (
        <div>
            <h1>Login Form</h1>

            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={onSubmit} disabled={email === '' || password === ''}>Login</button>
        </div>
    )
}

export default LoginForm



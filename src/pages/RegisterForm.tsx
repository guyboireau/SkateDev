import { useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const RegisterForm = () => {
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        setError(null)

        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password)
            console.log(newUser)
            if (newUser.user) {
                navigate('/login')
            }
        } catch (error : any) {
            const errorCode = error.code
            console.log(errorCode)
            if (errorCode === 'auth/weak-password') {
                setError('Le mot de passe doit faire au minimum 6 caractères')
            } else if (errorCode === 'auth/email-already-in-use') {
                setError('L\'email est déjà utilisé')
            } else {
                setError('Une erreur est survenue')
            }
        }
    }

    return (
        <div>
            <h1>Register Form</h1>

            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={onSubmit} disabled={email === '' || password === ''}>Register</button>
        </div>
    )
}

export default RegisterForm
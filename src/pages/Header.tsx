import { NavLink } from "react-router-dom"
import { Fragment, useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { signOut } from "@firebase/auth"
import '../css/Header.css'
import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"


const Header = () => {
    const { state, dispatch } = useContext(AuthContext)
    const [displayName, setDisplayName] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch({ type: 'LOGOUT', payload: null })
        }).catch((_error) => {
            console.log(_error);
        });
    }

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

    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/park'>Skateparks</NavLink>
            {state.isLogged ? (
                <Fragment>
                    <NavLink to='/Profile'>Profile de {displayName}</NavLink>
                    <NavLink to='/' onClick={handleLogout}>Logout</NavLink>
                </Fragment>
            ) : (
                <NavLink to='/login'>Login</NavLink>
            )}
        </nav>
    )
}

export default Header;


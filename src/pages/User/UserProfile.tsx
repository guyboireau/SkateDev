import { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase';
import {  doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


interface User {
    name: string;
    email: string;
    bio: string;
}

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const getUserDoc = async () => {
                const docRef = doc(db, "user", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCurrentUser(docSnap.data() as User | any);
                } else {
                    console.log("No such document!");
                }
            };

            getUserDoc();
        }
    }, [user]);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h1>Profil de {currentUser.name}</h1>
            <p>Email : {currentUser.email}</p>
            <p>Bio : {currentUser.bio}</p>
            <button onClick={() => navigate('/settings')}>Modifier</button>
        </div>
    );
};

export default UserProfile;
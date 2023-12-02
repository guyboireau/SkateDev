import { Dispatch, useEffect } from "react";
import { createContext, useReducer } from "react";
import { authReducer, initState } from "../reducers/AuthReducer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LOGOUT } from "../reducers/AuthReducer";

interface AuthState {
    isLogged: boolean;
    isLoading: boolean;
    userInfos: {
        email: string;
        password: string;
    };
}

interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<{ type: string; payload: any }>;
}

const defaultValueType: AuthContextType = {
    state: initState,
    dispatch: () => null,
};


export const AuthContext = createContext(defaultValueType);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLogged: false,
        isLoading: false,
        userInfos: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
    });



    // ...

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                dispatch({ type: LOGOUT, payload: null });
            }
        });

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => unsubscribe();
    }, []);
  
    return (
        <AuthContext.Provider value={{ state: { ...state, userInfos: state.userInfos }, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
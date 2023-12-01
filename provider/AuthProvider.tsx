import { ReactNode, Dispatch, useEffect } from "react";
import { createContext, useReducer } from "react";
import { LOGIN, authReducer, initState } from "../reducers/AuthReducer";

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

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    useEffect(() => {
        const user = localStorage.getItem('@user')
        if (user) {
            dispatch({ type: LOGIN, payload: JSON.parse(user) })
        }
    }, [])

    const authState: AuthState = {
        ...state,
        userInfos: {
            email: "",
            password: "",
            ...state.userInfos,
        },
        isLogged: false,
        isLoading: false, 
    };

    return (
        <AuthContext.Provider value={{ state: authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

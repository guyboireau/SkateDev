import { Fragment, useContext } from 'react'
import LoginForm from './pages/LoginForm'
import UserSettingsForm from './pages/settings/UserSettingsForm'
import { AuthContext } from './provider/AuthProvider'

const MainApp = () => {
    const { state } = useContext(AuthContext)

    return (
        <Fragment>
            {state.isLoading ? (
                <div>Loading...</div>
            ) : state.isLogged ? (
                <UserSettingsForm />
            ) : (
                <LoginForm />
            )}
        </Fragment>
    )
}

export default MainApp

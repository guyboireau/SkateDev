
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './pages/Layout'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import Park from './pages/Park/Park'
import NotFound from './pages/NotFound'
import UserSettingsForm from './pages/settings/UserSettingsForm'
import Skatepark from './pages/Park/Skatepark'
import RegisterForm from './pages/RegisterForm'


function App() {

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/sign-up' element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/park" element={<Skatepark />} />
          <Route path="/park/:postId" element={<Park />} />
          <Route path="/settings" element={
            <ProtectedRoute>
              <UserSettingsForm />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App

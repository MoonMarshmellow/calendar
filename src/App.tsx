import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css'
import { auth } from './firebase'
import User from './components/user';
import CalendarApp from './components/calendarApp';
import './calendarStyles/styles.scss'

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <CalendarApp /> : <User />}
    </>
  )
}

export default App

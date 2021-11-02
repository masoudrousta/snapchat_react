import { onAuthStateChanged } from '@firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chats from './components/Chats'
import ChatView from './components/ChatView'
import Login from './components/Login'
import Preview from './components/Preview'
import WebcamCapture from './components/WebcamCapture'
import { login, logout, selectUser } from './features/appSlice'
import { auth } from './firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (LoggedInUser) => {
      if (LoggedInUser) {
        dispatch(
          login({
            username: LoggedInUser.displayName,
            profilePic: LoggedInUser.photoURL,
            id: LoggedInUser.uid,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className='flex flex-col items-center justify-center bg-yellow-300 h-screen'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='object-contain h-20'
              src='/images/snapchat.png'
              alt='snapchat logo'
            />

            <div className='bg-white h-96'>
              <Switch>
                <Route path='/chats/view'>
                  <ChatView />
                </Route>
                <Route path='/chats'>
                  <Chats />
                </Route>
                <Route path='/preview'>
                  <Preview />
                </Route>
                <Route exact path='/'>
                  <WebcamCapture />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  )
}

export default App

import { signInWithPopup } from '@firebase/auth'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from '../features/appSlice'
import { auth, provider } from '../firebase'

function Login() {
  const dispatch = useDispatch()

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        )
      })
      .catch((error) => {
        alert(error.message)
      })
  }
  return (
    <div className='bg-yellow-300 grid place-items-center h-screen w-full'>
      <div className='flex flex-col'>
        <img
          className='h-[300px] object-contain'
          src='/images/snapchat.png'
          alt='snapchat logo'
        />
        <Button variant='outlined' onClick={signin}>
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Login

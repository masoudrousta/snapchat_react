import { collection, getDocs, orderBy, query } from '@firebase/firestore'
import {
  ChatBubbleOutlined,
  RadioButtonUncheckedOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectUser } from '../features/appSlice'
import { resetCameraImage } from '../features/cameraSlice'
import { auth, db } from '../firebase'
import Chat from './Chat'

function Chats() {
  const [posts, setPosts] = useState([])
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    getDocs(query(collection(db, 'posts'), orderBy('timestamp', 'desc'))).then(
      (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      }
    )
  }, [])

  const takeSnap = () => {
    dispatch(resetCameraImage())
    history.push('/')
  }
  return (
    <div className='relative h-[400px] w-[250px] '>
      <div className='flex justify-between items-center pl-1 pr-1 bg-blue-400 h-1/2 py-3'>
        <Avatar
          className='h-1/2 w-1/2 cursor-pointer'
          src={user.profilePic}
          onClick={() => auth.signOut()}
        />
        <div className='flex items-center flex-1 pl-2'>
          <SearchOutlined className='text-white !text-lg' />
          <input
            className='outline-none bg-transparent border-none text-[12px] flex-1 text-white placeholder-white placeholder-opacity-100'
            type='text'
            placeholder='Friends'
          />
        </div>
        <ChatBubbleOutlined className='text-white !text-xl' />
      </div>
      <div className='h-96 bg-white shadow-lg -mt-2 rounded-tl-lg rounded-tr-lg overflow-scroll scrollbar-hide'>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedOutlined
        className='absolute bg-transparent rounded-lg text-gray-700 !text-xl cursor-pointer bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:opacity-80'
        fontSize='large'
        onClick={takeSnap}
      />
    </div>
  )
}

export default Chats

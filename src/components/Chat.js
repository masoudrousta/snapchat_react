import { useDispatch } from 'react-redux'
import { StopRounded } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import TimeAgo from 'react-timeago'
import { selectImage } from '../features/appSlice'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { useHistory } from 'react-router'

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const open = async () => {
    dispatch(selectImage(imageUrl))
    if (!read) {
      await updateDoc(doc(db, 'posts', id), {
        read: true,
      })
    }
    history.push('/chats/view')
  }
  return (
    <div
      className='flex items-center justify-between p-2 border-b-2 border-blue-100 cursor-pointer hover:opacity-80'
      onClick={open}
    >
      <Avatar className='!h-9 !w-9' src={profilePic} />
      <div className='pl-1 flex-1'>
        <h4 className='text-md font-bold'>{username}</h4>
        <p className='text-sm'>
          Tap to view -{' '}
          <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />{' '}
        </p>
      </div>

      {!read && <StopRounded className='text-red-400' />}
    </div>
  )
}

export default Chat

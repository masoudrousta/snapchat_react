import {
  AttachFileOutlined,
  CloseOutlined,
  CreateOutlined,
  CropOutlined,
  MusicNoteOutlined,
  NoteOutlined,
  SendOutlined,
  TextFieldsOutlined,
  TimerOutlined,
} from '@mui/icons-material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetCameraImage, selectCamera } from '../features/cameraSlice'
import { v4 as uuidv4 } from 'uuid'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { selectUser } from '../features/appSlice'

function Preview() {
  const user = useSelector(selectUser)
  const cameraImage = useSelector(selectCamera)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/')
    }
  }, [cameraImage, history])

  const closePreview = () => {
    dispatch(resetCameraImage())
    history.replace('/')
  }

  const sendPost = () => {
    const id = uuidv4()
    const storageRef = ref(storage, `posts/${id}`)
    uploadString(storageRef, cameraImage, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
        const docRef = await addDoc(collection(db, 'posts'), {
          imageUrl: downloadUrl,
          username: user.username,
          read: false,
          profilePic: user.profilePic,
          timestamp: serverTimestamp(),
        })
        history.replace('/chats')
      })
    })
  }

  return (
    <div className='relative'>
      <CloseOutlined
        className='absolute top-0 m-1 text-[18px] cursor-pointer text-white'
        onClick={closePreview}
      />
      <div className='text-gray-500 absolute right-0 flex flex-col m-2'>
        <TextFieldsOutlined className='!text-lg mb-1 cursor-pointer' />
        <CreateOutlined className='!text-lg mb-1 cursor-pointer' />
        <NoteOutlined className='!text-lg mb-1 cursor-pointer' />
        <MusicNoteOutlined className='!text-lg mb-1 cursor-pointer' />
        <AttachFileOutlined className='!text-lg mb-1 cursor-pointer' />
        <CropOutlined className='!text-lg mb-1 cursor-pointer' />
        <TimerOutlined className='!text-lg mb-1 cursor-pointer' />
      </div>
      <img src={cameraImage} alt='' />
      <div
        className='bg-yellow-300 text-black flex items-center justify-evenly p-1 cursor-pointer absolute bottom-0 -right-1 transform -translate-x-1/2 -translate-y-1/2 rounded-md'
        onClick={sendPost}
      >
        <h2 className='text-md mr-2 font-bold'>Send Now</h2>
        <SendOutlined fontSize='small' className='!text-md' />
      </div>
    </div>
  )
}

export default Preview

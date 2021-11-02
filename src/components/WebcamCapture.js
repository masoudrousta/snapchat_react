import { RadioButtonUncheckedOutlined } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Webcam from 'react-webcam'
import { setCameraImage } from '../features/cameraSlice'
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
}

function WebcamCapture() {
  const webcamRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    dispatch(setCameraImage(imageSrc))
    history.push('/preview')
  }, [webcamRef])

  return (
    <div className='relative'>
      <CloseIcon
        className='absolute top-0 left-2 transform translate-y-1/2 cursor-pointer text-white text-xl'
        fontSize='large'
        onClick={() => history.push('/chats')}
      />

      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <RadioButtonUncheckedOutlined
        className='absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white '
        onClick={capture}
        fontSize='large'
      />
    </div>
  )
}

export default WebcamCapture

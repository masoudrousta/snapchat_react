import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetImage, selectSelectedImage } from '../features/appSlice'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!selectedImage) exit()
  }, [selectedImage])
  const exit = () => {
    dispatch(resetImage())
    history.replace('/chats')
  }

  return (
    <div className='relative'>
      <img
        className='cursor-pointer'
        src={selectedImage}
        alt='image'
        onClick={exit}
      />
      <div className='absolute top-0 right-0 m-2'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
          onComplete={exit}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

export default ChatView

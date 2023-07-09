import { useState, useEffect } from 'react'

const BGM = ({ bgmUrl = '/sounds/bgm/raon_raul.mp3' }) => {
  const [play, setPlay] = useState(false)
  const [audio, setAudio] = useState()

  const togglePlay = () => {
    if (play === true) {
      setPlay(false)
      console.log(audio)
      audio.pause()
    } else {
      setPlay(true)
      audio.loop = true
      audio.play()
    }
  }

  useEffect(() => {
    setAudio(new Audio(bgmUrl))
  }, [])

  return (
    <button
      className='absolute p-4 text-center text-white rounded-full min-w-[150px] bg-[#8171C3] z-[2] bottom-[65px] right-[30px]'
      onContextMenuCapture={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
      onClickCapture={(event) => {
        event.stopPropagation()
        togglePlay()
      }}>
      {play === true ? 'BGM OFF' : 'BGM ON'}
    </button>
  )
}

export default BGM

import { HTMLAttributes, useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

const BGM = ({ bgmUrl = '/sounds/bgm/raon_raul.mp3' }) => {

    const [play, setPlay] = useState(false);
    const [audio, setAudio] = useState();

    

    const togglePlay = () => {
        if(play === true) {
            setPlay(false);
            console.log(audio)
            audio.pause()
        }
        else {
            setPlay(true);
            audio.play()
        }
    }

    useEffect(() => {
        setAudio(new Audio(bgmUrl))
    }, [])


  return (
    <div>
        <button onClick={togglePlay}>{play === true ? 'bgm off' : 'bgm on'}</button>
    </div>
  )
}

export default BGM

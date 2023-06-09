import { useState, useEffect } from 'react'


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
            audio.loop = true;
            audio.play()
        }
    }

    useEffect(() => {
        setAudio(new Audio(bgmUrl))
    }, [])


  return (
 
        <button className='absolute p-2 text-center text-white rounded-full bg-[#8171C3] z-[1] bottom-[65px] right-[30px]' onClick={togglePlay}>{play === true ? 'bgm off' : 'bgm on'}</button>

  )
}

export default BGM

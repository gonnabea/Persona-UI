import { useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Content from './Content'
import { joinRoom } from '@/colyseus'

interface FormValues {
  chatValues: {
    chat: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  chatValues: {
    chat: '',
  },
}
const chatRoom = joinRoom('main')

const Chat = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [chatMessages, setChatMessages] = useState<string[]>([])

  // submit chat
  const { register, handleSubmit, getValues, setValue } = useForm<FormValues>({
    defaultValues,
  })

  const submitChatMesssage = () => {
    const message = getValues('chatValues.chat')

    if (message) {
      chatRoom.then((room) => {
        room.send('chat', message)
      })

      setValue('chatValues.chat', '')
    }
  }

  // get chat
  const getChatMessage = () => {
    chatRoom
      .then((room) => {
        room.onMessage('chat', (chat) => {
          setChatMessages((prevChat) => [...prevChat, chat])
        })
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getChatMessage()
  }, [])

  // 채팅 갱신 됐을 때 스크롤 박스 아래로 내리기
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatMessages])

  return (
    <div
      className={`
          absolute
          bottom-[40px]
          left-[40px]
          bg-transparent
          z-[20]
        `}>
      <form onSubmit={handleSubmit(submitChatMesssage)}>
        <ScrollBox
          ref={chatBoxRef}
          className='flex flex-col items-start px-0 bg-transparent w-[800px] h-[300px] pb-[10px] [&>*]:text-white'>
          <>
            {chatMessages.map((chat, idx) => (
              <Content key={idx}>{chat}</Content>
            ))}
          </>
        </ScrollBox>
        <Input
          type='text'
          className='w-[260px]'
          placeholder='채팅입력...'
          {...register('chatValues.chat')}
          // ref={chatInputRef}
        />
      </form>
    </div>
  )
}

export default Chat

import { useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Content from './Content'
import { colyseusClient } from '@/colyseus'
import { Room } from 'colyseus.js'

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



const Chat = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const chatRoomRef = useRef<Room<unknown>>()

  // submit chat
  const { register, handleSubmit, getValues, setValue } = useForm<FormValues>({
    defaultValues,
  })

  const submitChatMesssage = () => {
    const message = getValues('chatValues.chat')

    if (message) {
        console.log(message)
        chatRoomRef.current.send('chats', message)
      

      setValue('chatValues.chat', '')
    }
  }

  // get chat
  const getChatMessage = (room) => {
    
        room.onMessage('chats', (chat) => {
          console.log(chat)
          setChatMessages((prevChat) => [...prevChat, chat])
        })
        
      
      
  }

  useEffect(() => {
    colyseusClient.joinOrCreate('main').then(room => {
      chatRoomRef.current = room;
              
      getChatMessage(room)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <Input type='text' className='w-[260px]' placeholder='채팅입력...' {...register('chatValues.chat')} />
      </form>
    </div>
  )
}

export default Chat

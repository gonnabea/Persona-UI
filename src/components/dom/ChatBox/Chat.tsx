import { useCallback, useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Content from './Content'
import { joinRoom } from '@/colyseus'
import { useSetRecoilState } from 'recoil'
import { chatEnabledState } from '@/recoil/chat/atom'

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
  const setChatEnabled = useSetRecoilState(chatEnabledState)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [chatHasError, setChatHasError] = useState<boolean>(false)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)

  // submit chat
  const { register, handleSubmit, getValues, setValue } = useForm<FormValues>({
    defaultValues,
  })

  const { ref, ...chatInputEvents } = register('chatValues.chat')

  const submitChatMesssage = () => {
    const message = getValues('chatValues.chat')

    if (message) {
      chatRoom.then((room) => {
        room.send('chat', message)
      })

      setValue('chatValues.chat', '')
      chatInputRef.current.blur()
      setChatEnabled(false)
    }
  }

  // Enter, Esc키 이벤트 제어
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      const { key } = event
      const isFocused = document.activeElement === chatInputRef.current

      // 채팅 활성화 제어
      if (key === 'Enter' && !isFocused && !chatHasError) {
        chatInputRef.current.focus()
        setChatEnabled(true)
      }

      if (key === 'Escape' && isFocused && !chatHasError) {
        chatInputRef.current.blur()
        setValue('chatValues.chat', '')
        setChatEnabled(false)
      }

      //인게임 메뉴 제어
    }

    window.addEventListener('keydown', handleKeyEvent)
    return () => {
      window.removeEventListener('keydown', handleKeyEvent)
    }
  }, [chatHasError, setChatEnabled, setValue])

  // get chat
  const getChatMessage = () => {
    chatRoom
      .then((room) => {
        room.onMessage('chat', (chat) => {
          setChatMessages((prevChat) => [...prevChat, chat])
        })
      })
      .catch((error) => {
        setChatMessages((prevMessages) => {
          return [...prevMessages, '채팅서버 연결실패']
        })
        setChatHasError(true)
      })
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
          className='flex flex-col items-start px-0 bg-transparent w-[800px] h-[300px] pb-[10px] [&>*]:text-white no-scrollbar'>
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
          disabled={chatHasError}
          {...chatInputEvents}
          ref={(e) => {
            ref(e)
            chatInputRef.current = e
          }}
        />
      </form>
    </div>
  )
}

export default Chat

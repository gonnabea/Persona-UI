import { useEffect, useRef, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'

import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Button from '@/components/dom/Button'
import Content from './Content'
import { useRecoilState } from 'recoil'
import { chatEnabledState } from '@/recoil/chat/atom'
import { colyseusRoomState } from '@/recoil/colyseusRoom/atom'

const chatContainerStyles = {
  mobile: `
    top-0
    left-0
    right-0
    bottom-0
    bg-black
    bg-opacity-50
  `,
  pc: `
    top-[unset]
    right-[unset]
    bottom-[40px]
    left-[40px]
    bg-transparent
  `,
}

const chatBoxStyles = {
  mobile: 'w-full flex-1',
  pc: 'md:w-[500px] h-[300px]',
}

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

interface ChatProps {
  isMobile?: boolean
}

const Chat = ({ isMobile }: ChatProps) => {
  const [chatEnabeld, setChatEnabled] = useRecoilState(chatEnabledState)
  const [colyseusRoom, setColyseusRoom] = useRecoilState(colyseusRoomState)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [chatHasError, setChatHasError] = useState<boolean>(false)

  const chatBoxRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)

  const toggleChatEnabled = () => {
    setChatEnabled(!chatEnabeld)
  }

  // submit chat
  const { register, handleSubmit, getValues, setValue } = useForm<FormValues>({
    defaultValues,
  })

  const { ref, ...chatInputEvents } = register('chatValues.chat')

  const submitChatMesssage = () => {
    const message = getValues('chatValues.chat')
    if (message) {
      colyseusRoom?.send('chat', message)

      setValue('chatValues.chat', '')
      if (!isMobile) {
        chatInputRef.current.blur()
      }
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
      }

      if (key === 'Escape' && isFocused && !chatHasError) {
        chatInputRef.current.blur()
        setValue('chatValues.chat', '')
      }

      //인게임 메뉴 제어
    }

    if (!isMobile) window.addEventListener('keydown', handleKeyEvent)

    return () => {
      if (!isMobile) window.removeEventListener('keydown', handleKeyEvent)
    }
  }, [chatHasError, setChatEnabled, setValue, isMobile])

  // get chat
  const getChatMessage = () => {
    console.log(colyseusRoom)
    colyseusRoom?.onMessage('chat', (chat) => {
      setChatMessages((prevChat) => [...prevChat, `${chat.username}: ${chat.chatMessage}`])
    })

    colyseusRoom?.onMessage('join', (user) => {
      setChatMessages((prevChat) => [...prevChat, user.username + ' has joined'])
    })

    colyseusRoom?.onMessage('leave', (client) => {
      const username = client.username
      setChatMessages((prevChat) => [...prevChat, username + ' has left'])
    })

    // .catch((error) => {
    //   setChatMessages((prevMessages) => {
    //     return [...prevMessages, '채팅서버 연결실패']
    //   })
    //   setChatHasError(true)
    // })
  }

  useEffect(() => {
    getChatMessage()
  }, [colyseusRoom])

  // 채팅 갱신 됐을 때 스크롤 박스 아래로 내리기
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatMessages])

  if (isMobile && !chatEnabeld) return null

  return (
    <div
      className={`
          absolute
          z-[20]
          ${chatContainerStyles[isMobile ? 'mobile' : 'pc']}
        `}
      onContextMenuCapture={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
      onClickCapture={(event) => {
        event.stopPropagation()
      }}>
      <form onSubmit={handleSubmit(submitChatMesssage)} className={isMobile ? 'h-full flex flex-col px-[10px]' : ''}>
        <ScrollBox
          ref={chatBoxRef}
          className={`flex flex-col items-start px-0 bg-transparent pb-[10px] [&>*]:text-white no-scrollbar ${
            chatBoxStyles[isMobile ? 'mobile' : 'pc']
          }`}>
          <>
            {chatMessages.map((chat, idx) => (
              <Content key={idx}>{chat}</Content>
            ))}
          </>
        </ScrollBox>
        <Input
          type='text'
          className={`${isMobile ? 'w-full' : 'w-[260px] sticky bottom-0'}`}
          placeholder='채팅입력...'
          disabled={chatHasError}
          {...chatInputEvents}
          ref={(e) => {
            ref(e)
            chatInputRef.current = e
          }}
          onFocus={() => {
            setChatEnabled(true)
          }}
          onBlur={() => {
            setChatEnabled(false)
          }}
        />
      </form>
    </div>
  )
}

export const getStaticProps = async () => {
  return { props: { title: '3dWorld' } }
}

export default Chat

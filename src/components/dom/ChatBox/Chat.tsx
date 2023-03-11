import * as Colyseus from 'colyseus.js'

import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Content from './Content'
import { useEffect, useRef } from 'react'

const Chat = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const client = new Colyseus.Client('ws://localhost:4001')

  client
    .joinOrCreate('room_name')
    .then((room) => {
      console.log(room.sessionId, 'joined', room.name)

      // room.onMessage('message_type', (message) => {
      //   console.log(client.id, 'received on', room.name, message)
      // })
    })
    .catch((e) => {
      console.log('JOIN ERROR', e)
    })

  // Set scroll position to bottom in chat is updated..
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [])

  return (
    <div
      className={`
          absolute
          bottom-[40px]
          left-[40px]
          bg-transparent
          z-[20]
        `}>
      <ScrollBox
        ref={chatBoxRef}
        className='flex flex-col items-start px-0 bg-transparent w-[800px] h-[300px] pb-[10px] [&>*]:text-white'>
        <>
          <Content>채팅입니다 1.</Content>
          <Content>채팅입니다 2.</Content>
          <Content>채팅입니다 3.</Content>
          <Content>채팅입니다 4.</Content>
          <Content>채팅입니다 5.</Content>
          <Content>채팅입니다 6.</Content>
          <Content>채팅입니다 7.</Content>
          <Content>채팅입니다 8.</Content>
          <Content>채팅입니다 9.</Content>
          <Content>채팅입니다 10.</Content>
          <Content>채팅입니다 11.</Content>
          <Content>채팅입니다 12.</Content>
          <Content>채팅입니다 13.</Content>
          <Content>채팅입니다 14.</Content>
          <Content>채팅입니다 15.</Content>
        </>
      </ScrollBox>
      <Input type='text' className='w-[260px]' placeholder='채팅입력...' />
    </div>
  )
}

export default Chat

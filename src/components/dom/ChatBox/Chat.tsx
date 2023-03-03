import { Input } from '@/components/dom/Forms'
import ScrollBox from '@/components/dom/ScrollBox'
import Content from './Content'

const Chat = () => {
  return (
    <div
      className={`
          absolute
          bottom-[40px]
          left-[40px]
          bg-transparent
          z-[20]
        `}>
      <ScrollBox className='flex flex-col-reverse items-start px-0 bg-transparent w-[800px] h-[300px] pb-[10px] [&>*]:text-white'>
        <>
          <Content>채팅입니다 15.</Content>
          <Content>채팅입니다 14.</Content>
          <Content>채팅입니다 13.</Content>
          <Content>채팅입니다 12.</Content>
          <Content>채팅입니다 11.</Content>
          <Content>채팅입니다 10.</Content>
          <Content>채팅입니다 9.</Content>
          <Content>채팅입니다 8.</Content>
          <Content>채팅입니다 7.</Content>
          <Content>채팅입니다 6.</Content>
          <Content>채팅입니다 5.</Content>
          <Content>채팅입니다 4.</Content>
          <Content>채팅입니다 3.</Content>
          <Content>채팅입니다 2.</Content>
          <Content>채팅입니다 1.</Content>
        </>
      </ScrollBox>
      <Input type='text' className='w-[260px]' placeholder='채팅입력...' />
    </div>
  )
}

export default Chat

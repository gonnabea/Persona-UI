import PersonaBI from '@/assets/icons/persona-bi.svg'
import Plus from '@/assets/icons/plus.svg'
import Container from '@/components/dom/Container'
import Header from '@/components/dom/Header'
import CharactersList from '@/components/dom/CharactersList'
import Button from '@/components/dom/Button'

const Characters = () => {
  return (
    <div className='flex flex-col h-full bg-primary-400'>
      <Header width='full' className='border-none py-[40px]'>
        <PersonaBI className='fill-white w-[145.71px]' />
      </Header>
      <Container width='full' className='flex flex-grow'>
        <div className='h-full [&>*]:text-white'>
          <h2 className='w-full font-black text-center mt-[22px]'>캐릭터 선택</h2>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex flex-col items-center justify-center'>
              {/* <div className='[&>*]:text-white px-[74px] pb-[93px] pt-[114px] bg-primary-300 rounded-[20px] hover:cursor-pointer'>
                <Plus className='mx-auto' />
                <h6 className='text-[14px] mt-[44px]'>새로 만들기</h6>
              </div> */}
              {/* 캐릭터 존재할 경우.. */}
              <CharactersList />
              <Button color='primary'>시작하기</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Characters

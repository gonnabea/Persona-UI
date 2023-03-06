import PersonaBI from '@/assets/icons/persona-bi.svg'
import Plus from '@/assets/icons/plus.svg'
import Container from '@/components/dom/Container'
import Header from '@/components/dom/Header'
import CharactersList from '@/components/dom/CharactersList'
import Button from '@/components/dom/Button'
import useToggle from '@/hooks/useToggle'
import { useEffect } from 'react'
import Modal from '@/components/dom/Modal'
import { Input } from '@/components/dom/Forms'
import Link from 'next/link'

const Characters = () => {
  const [newCharModal, toggleNewCharModal] = useToggle(false)

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
              {/* 캐릭터가 없는 경우... */}
              {/* <Button
                onClick={toggleNewCharModal}
                color='transparent'
                className='[&>*]:text-white px-[74px] pb-[93px] pt-[114px] bg-primary-300 rounded-[20px]'>
                <Plus className='mx-auto' />
                <h6 className='text-[14px] mt-[44px]'>새로 만들기</h6>
              </Button> */}
              {/* 캐릭터 존재할 경우.. */}
              <CharactersList
                title={true}
                titleClassName='[&>*]:text-white'
                carouselArrowClassName='w-[15px] h-[27px]'
              />
              <Link href='/3dWorld'>
                <Button color='primary'>시작하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        active={newCharModal}
        toggle={toggleNewCharModal}
        bodyChildren={
          <>
            <CharactersList
              carouselClassName='w-[204px]'
              carouselItemClassName='w-[204px] px-[17px]'
              carouselArrowButtonClassName='w-[32px] h-[32px] p-0'
              carouselArrowClassName='w-[10px] mx-auto'
            />
            <Input placeholder='캐릭터 이름' className='w-full text-center px-[12px]' type='text' />
          </>
        }
        footerChildren={
          <>
            <Button color='primary' className='w-full rounded-t-none rounded-b-[18px] py-[20px] text-[18px]'>
              생성하기
            </Button>
          </>
        }
        footerClassName='m-[-30px]'
      />
    </div>
  )
}

export default Characters

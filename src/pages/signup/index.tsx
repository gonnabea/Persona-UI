import Link from 'next/link'

import PersonaBI from '@/assets/icons/persona-bi.svg'
import { CheckboxList } from '@/components/dom/Forms'
import Header from '@/components/dom/Header'
import Container from '@/components/dom/Container'
import Button from '@/components/dom/Button'
import Footer from '@/components/dom/Footer'
import Modal from '@/components/dom/Modal'
import useToggle from '@/hooks/useToggle'

const SignUpTerms = () => {
  const [isTermsToggled, toggleTerms] = useToggle(false)
  const termsCheckboxLists = [
    { title: '모두 동의', description: '', highlight: true },
    {
      title: '서비스 이용약관 동의(필수)',
      description: '',
      onSideButtonClick: toggleTerms,
      highlight: false,
    },
    {
      title: '개인정보 수집 및 이용동의(필수)',
      onSideButtonClick: () => {
        console.log('clicked 1')
      },
      highlight: false,
    },
    {
      title: '게임 플레이 등에 유용한 소식 받기',
      description: '업데이트, 사전등록, 이벤트 참가 등 도움되는 정보를 받습니다.',
      highlight: false,
    },
  ]

  return (
    <div className='flex flex-col w-full h-full'>
      <Header width='md'>
        <div className='flex items-center justify-between'>
          <PersonaBI className='fill-typo-black-primary' width='120px' />
          <Link href='/signin'>로그인</Link>
        </div>
      </Header>
      <Container width='md'>
        <div className='flex flex-col items-center w-full h-full mt-[160px]'>
          <h2>약관동의</h2>
          <form className='grid w-[400px] justify-items-center'>
            <CheckboxList id='terms' className='w-full my-[40px]' items={termsCheckboxLists} />
            <Button color='primary'>다음</Button>
          </form>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
      <Modal
        active={isTermsToggled}
        toggle={toggleTerms}
        headerChildren={<>Title</>}
        bodyChildren={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>}
      />
    </div>
  )
}

export default SignUpTerms

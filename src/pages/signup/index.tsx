import Header from '@/components/dom/Header'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import Link from 'next/link'
import Container from '@/components/dom/Container'
import Button from '@/components/dom/Button'
import { CheckboxList } from '@/components/dom/Forms'

const SignUpTerms = () => {
  const termsCheckboxLists = [
    { title: '모두 동의', description: '', highlight: true },
    {
      title: '서비스 이용약관 동의(필수)',
      description: '',
      onSideButtonClick: () => {
        console.log('clicked 0')
      },
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
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h2>약관동의</h2>
          <form className='grid w-[400px] justify-items-center'>
            <CheckboxList id='terms' className='w-full my-[40px]' items={termsCheckboxLists} />
            <Button color='primary'>다음</Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default SignUpTerms

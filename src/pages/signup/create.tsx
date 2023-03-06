import Link from 'next/link'
import { useRouter } from 'next/router'

import PersonaBI from '@/assets/icons/persona-bi.svg'
import Button from '@/components/dom/Button'
import Footer from '@/components/dom/Footer'
import Header from '@/components/dom/Header'
import Container from '@/components/dom/Container'
import { Input } from '@/components/dom/Forms'
import isContainsAll from '@/utils/array/isContainsAll'

const termsCheckOptions = ['serviceTerms', 'privacyTerms', 'newsletter'] as const
type TermsCheckList = (typeof termsCheckOptions)[number]

const SignUpCreate = () => {
  const router = useRouter()

  if (
    !Array.isArray(router.query.termsCheckList) ||
    !isContainsAll<TermsCheckList>(router.query.termsCheckList as TermsCheckList[], ['serviceTerms', 'privacyTerms'])
  ) {
    router.push('/signup')
  }

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
          <h2 className='mb-[40px]'>회원 가입</h2>
          <form className='grid w-[320px] justify-items-center'>
            <Input errorMessage='이메일을 입력해주세요.' className='w-full' label='이메일' type='email' />
            <Input errorMessage='비밀번호가 틀립니다' className='w-full' label='비밀번호' type='password' />
            <Input errorMessage='비밀번호가 틀립니다' className='w-full' label='비밀번호 확인' type='password' />
            <Button color='primary' className='w-full mt-[20px]'>
              다음
            </Button>
          </form>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
    </div>
  )
}

export default SignUpCreate

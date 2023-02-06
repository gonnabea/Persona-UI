import Container from '@/components/dom/Container'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import Input from '@/components/dom/Input'
import Checkbox from '@/components/dom/Checkbox'
import Link from 'next/link'
import Button from '@/components/dom/Button'
import Image from 'next/image'
import signinBg from '@/assets/images/signin-bg.png'

const SignIn = () => {
  return (
    <div className='w-full h-full grid grid-cols-2 divide-x-0'>
      <div className='relative'>
        <Image className='object-cover' src={signinBg} alt='signin-background' fill />
      </div>
      <Container width='sm'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div>
            <PersonaBI className='w-[200px] mb-[60px] fill-primary-200' />
          </div>
          <div className='w-full'>
            <form>
              <Input type='email' label='이메일' className='w-full' />
              <Input type='password' label='비밀번호' className='w-full' />
              {/* Login options (Always login, find accounts) */}
              <div className='flex items-center justify-between w-full mb-[20px]'>
                <div>
                  <Checkbox label='로그인 상태 유지' labelPosition='right' />
                </div>
                <div className='text-xs'>
                  <Link href='/find-password'>비밀번호 찾기</Link>
                </div>
              </div>
              <Button className='w-full mb-[20px]'>로그인</Button>
              <Button className='w-full'>Persona 가입</Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SignIn

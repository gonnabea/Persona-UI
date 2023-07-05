import Link from 'next/link'
import Image from 'next/image'
import { useForm, DefaultValues } from 'react-hook-form'

import PersonaBI from '@/assets/icons/persona-bi.svg'
import signinBg from '@/assets/images/signin-bg.png'
import Container from '@/components/dom/Container'
import Button from '@/components/dom/Button'
import { Input, Checkbox } from '@/components/dom/Forms'
import { useRouter } from 'next/router'
import { axiosClient } from '@/axios.config'

interface FormValues {
  signInValues: {
    email: string
    password: string
  }
  keepSignIn: boolean
}

const defaultValues: DefaultValues<FormValues> = {
  signInValues: {
    email: '',
    password: '',
  },
  keepSignIn: false,
}

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit = async () => {
    try {
      const { data } = await axiosClient.post('/auth/sign-in', getValues('signInValues'))
      localStorage.setItem('me', JSON.stringify(data))
      router.push('/characters')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative flex justify-center w-full h-full lg:grid lg:grid-cols-2 lg:divide-x-0 lg:static'>
      <div className='absolute w-full h-full lg:relative lg:w-auto lg:h-auto'>
        <Image className='object-cover' src={signinBg} alt='signin-background' fill />
      </div>
      <Container className='flex items-center justify-center z-[2] lg:block'>
        <div className='flex flex-col items-center justify-center w-full mx-auto bg-white lg:h-full lg:w-[320px] p-[20px] lg:p-0 rounded-[20px] lg:rounded-none'>
          <div>
            <PersonaBI className='w-[200px] mb-[60px] fill-primary-200' />
          </div>
          <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type='email'
                id='email'
                label='이메일'
                className='w-full'
                errorMessage={errors.signInValues?.email?.message}
                {...register('signInValues.email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              <Input
                type='password'
                id='password'
                label='비밀번호'
                className='w-full'
                errorMessage={errors.signInValues?.password?.message}
                {...register('signInValues.password', {
                  required: '비밀번호를 입력해주세요',
                })}
              />
              {/* Login options (Always login, find accounts) */}
              <div className='flex items-center justify-between w-full mb-[20px]'>
                <div>
                  <Checkbox
                    label='로그인 상태 유지'
                    labelPosition='right'
                    id='always-login'
                    {...register('keepSignIn')}
                    onChange={(e) => {
                      setValue('keepSignIn', e.target.checked)
                    }}
                  />
                </div>
                <div className='text-xs underline'>
                  <Link href='/resetPassword'>비밀번호 찾기</Link>
                </div>
              </div>
              <Button color='primary' className='w-full mb-[20px]'>
                로그인
              </Button>
              <Link href='/signup'>
                <Button color='secondary' className='w-full'>
                  Persona 가입
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export const getStaticProps = async () => {
  return { props: { title: '로그인' } }
}

export default SignIn

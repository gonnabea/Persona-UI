import Link from 'next/link'
import Image from 'next/image'
import { useForm, DefaultValues } from 'react-hook-form'

import PersonaBI from '@/assets/icons/persona-bi.svg'
import Container from '@/components/dom/Container'
import Button from '@/components/dom/Button'
import { Input, Checkbox } from '@/components/dom/Forms'
import { useRouter } from 'next/router'
import { axiosClient } from '@/axios.config'

interface FormValues {
  signInValues: {
    email: string
    password: string
    username: string
  }
  guestSignIn: boolean
}

const defaultValues: DefaultValues<FormValues> = {
  signInValues: {
    email: '',
    password: '',
    username: '', // 사용자명
  },
  guestSignIn: false,
}

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const signInSubmit = async () => {
    // 비회원 로그인 시 로컬스토리지에 사용자명만 기록하고 캐릭터 창으로 리다이렉트 처리
    if (getValues('guestSignIn')) {
      // 기존에 로그인했던 기록이 있다면 삭제 처리
      if (localStorage.getItem('me')) {
        localStorage.removeItem('me')
      }

      const userInfo = {
        data: {
          username: `guest-${getValues('signInValues.username')}`,
          isGuest: true,
        },
      }
      localStorage.setItem('me', JSON.stringify(userInfo))

      return router.push('/characters')
    }

    // 회원 로그인 시 API 요청
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
      <div className='absolute lg:h-screen lg:relative'>
        <img
          className='object-cover w-screen h-screen lg:w-full lg:h-full'
          src='/img/signin-bg.png'
          alt='signin-background'
        />
      </div>
      <Container className='lg:items-center lg:justify-center z-[2] lg:block'>
        <div className='flex flex-col items-center justify-center w-full mx-auto bg-white lg:h-full lg:w-[320px] p-[20px] lg:p-0 rounded-[20px] lg:rounded-none'>
          <div>
            <PersonaBI className='w-[200px] mb-[60px] fill-primary-200' />
          </div>
          <div className='w-full'>
            <form onSubmit={handleSubmit(signInSubmit)}>
              {watch('guestSignIn') ? (
                <>
                  <Input
                    type='text'
                    id='username'
                    label='닉네임'
                    className='w-full'
                    errorMessage={errors.signInValues?.username?.message}
                    {...register('signInValues.username', {
                      required: '닉네임을 입력해주세요',
                    })}
                  />
                </>
              ) : (
                <>
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
                </>
              )}

              {/* Login options (Guest sign in, find accounts) */}
              <div className='flex items-center justify-between w-full mb-[20px]'>
                <div>
                  <Checkbox
                    label='비회원 로그인'
                    labelPosition='right'
                    id='guest-signin'
                    {...register('guestSignIn')}
                    onChange={(e) => {
                      setValue('guestSignIn', e.target.checked)
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

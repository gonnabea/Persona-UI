import { useEffect } from 'react'
import { axiosClient } from '@/axios.config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, DefaultValues } from 'react-hook-form'

import PersonaBI from '@/assets/icons/persona-bi.svg'
import Button from '@/components/dom/Button'
import Footer from '@/components/dom/Footer'
import Header from '@/components/dom/Header'
import Container from '@/components/dom/Container'
import { Input } from '@/components/dom/Forms'
import isContainsAll from '@/utils/array/isContainsAll'

const termsCheckOptions = ['serviceTerms', 'privacyTerms', 'newsletter'] as const
type TermsCheckList = (typeof termsCheckOptions)[number]

interface FormValues {
  signUpValues: {
    email: string
    username: string
    password: string
    password2: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  signUpValues: {
    email: '',
    username: '',
    password: '',
    password2: '',
  },
}

const SignUpCreate = ({ query }) => {
  const { termsCheckList = [] } = query

  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit = async () => {
    try {
      await axiosClient.post('/auth/sign-up', getValues('signUpValues'))
      router.push({
        pathname: '/verify/email',
        query: {
          email: getValues('signUpValues.email'),
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 필수 이용약관을 체크 하지 않고 가입을 시도하려고 하면 이용약관 페이지로 이동
  useEffect(() => {
    if (!isContainsAll<TermsCheckList>(termsCheckList as TermsCheckList[], ['serviceTerms', 'privacyTerms'])) {
      router.push('/signup')
    }
  }, [router, termsCheckList])

  if (!isContainsAll<TermsCheckList>(termsCheckList as TermsCheckList[], ['serviceTerms', 'privacyTerms'])) return ''

  return (
    <div className='flex flex-col h-auto min-h-full'>
      <Header>
        <div className='flex items-center justify-between'>
          <PersonaBI className='fill-typo-black-primary' width='120px' />
          <Link href='/signin'>로그인</Link>
        </div>
      </Header>
      <Container className='flex items-center justify-center flex-1'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h2 className='mb-[40px]'>회원 가입</h2>
          <form className='w-full grid lg:w-[320px] justify-items-center' onSubmit={handleSubmit(onSubmit)}>
            <Input
              errorMessage={errors.signUpValues?.email?.message}
              className='w-full'
              label='이메일'
              type='email'
              {...register('signUpValues.email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <Input
              errorMessage={errors.signUpValues?.username?.message}
              className='w-full'
              label='사용자명'
              type='text'
              {...register('signUpValues.username', {
                required: '사용자명을 입력해주세요.',
              })}
            />
            <Input
              errorMessage={errors.signUpValues?.password?.message}
              className='w-full'
              label='비밀번호'
              type='password'
              {...register('signUpValues.password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            <Input
              errorMessage={errors.signUpValues?.password2?.message}
              className='w-full'
              label='비밀번호 확인'
              type='password'
              {...register('signUpValues.password2', {
                required: '다시 한번 비밀번호를 입력해주세요.',
                validate: (value: string) => {
                  if (watch('signUpValues.password') !== value) {
                    return '비밀번호가 일치하지 않습니다.'
                  }
                },
              })}
            />
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

export const getServerSideProps = ({ query }) => {
  return { props: { query, title: '회원가입' } }
}

export default SignUpCreate

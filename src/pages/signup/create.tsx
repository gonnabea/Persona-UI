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
import { useEffect } from 'react'
import axios from 'axios'

const termsCheckOptions = ['serviceTerms', 'privacyTerms', 'newsletter'] as const
type TermsCheckList = (typeof termsCheckOptions)[number]

interface FormValues {
  signUpValues: {
    email: string
    password: string
    password2: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  signUpValues: {
    email: '',
    password: '',
    password2: '',
  },
}

const SignUpCreate = ({ query }) => {
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

  const onSubmit = () => {
    axios
      .post('http://localhost:4000/auth/sign-up', getValues('signUpValues'))
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
    // try {
    //   const res = await axios.post('http://localhost:4000/auth/sign-up', getValues('signUpValues'))
    //   console.log(res)
    // } catch (error) {
    //   console.log(error)
    // }
    // router.push('/characters')
  }

  // 필수 이용약관을 체크 하지 않고 가입을 시도하려고 하면 이용약관 페이지로 이동
  useEffect(() => {
    const { termsCheckList = [] } = query
    if (!isContainsAll<TermsCheckList>(termsCheckList as TermsCheckList[], ['serviceTerms', 'privacyTerms'])) {
      router.push('/signup')
    }
  }, [query, router])

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
          <form className='grid w-[320px] justify-items-center' onSubmit={handleSubmit(onSubmit)}>
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

SignUpCreate.getInitialProps = async ({ query }) => {
  return { query }
}

export default SignUpCreate

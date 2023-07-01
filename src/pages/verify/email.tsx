import Button from '@/components/dom/Button'
import Container from '@/components/dom/Container'
import Footer from '@/components/dom/Footer'
import { Input } from '@/components/dom/Forms'
import Link from 'next/link'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import Header from '@/components/dom/Header'
import { useCallback, useEffect, useState } from 'react'
import { axiosClient } from '@/axios.config'
import { DefaultValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface FormValues {
  verifyEmailValues: {
    email: string
    token: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  verifyEmailValues: {
    email: '',
    token: '',
  },
}

const VerifyEmail = ({ query }) => {
  const { email } = query

  const [mailSent, setMailSent] = useState(false)
  const [isMailSending, setIsMailSending] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  // 이메일 토큰 전송
  const sendMail = useCallback(async () => {
    setIsMailSending(true)
    try {
      await axiosClient.post('/verify/email', {
        email: getValues('verifyEmailValues.email'),
      })
      setMailSent(true)
    } catch (error) {
      console.log(error)
    }
    setIsMailSending(false)
  }, [getValues])

  // 인증번호 인증
  const verifyToken = async () => {
    try {
      await axiosClient.get('/verify/email', {
        params: {
          token: decodeURIComponent(getValues('verifyEmailValues.token')),
        },
      })
      toast('성공적으로 인증 되었습니다.')
      router.push('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  // 이메일이 프롭으로 전달 됐을때 메일 전송 시도
  useEffect(() => {
    setValue('verifyEmailValues.email', email)
    sendMail()
  }, [email, sendMail, setValue])

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
          <h2 className='mb-[40px]'>메일 인증</h2>
          <div className='w-full grid lg:w-[320px] justify-items-center'>
            <Input
              errorMessage={errors.verifyEmailValues?.email?.message}
              className='w-full'
              label='이메일'
              type='email'
              disabled={mailSent}
              {...register('verifyEmailValues.email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <Input
              errorMessage={errors.verifyEmailValues?.token?.message}
              className='w-full appearance-none'
              label='인증번호'
              type='number'
              disabled={!mailSent}
              {...register('verifyEmailValues.token')}
            />
            <p className='text-xs text-gray-500'>
              PERSONA를 이용하기 위해서 메일 인증이 필요합니다. 회원가입에 사용한 메일에서 복사한 인증번호를
              입력해주세요.
            </p>
            <Button
              color='secondary'
              className='w-full mt-[20px]'
              disabled={mailSent || isMailSending}
              onClick={handleSubmit(sendMail)}>
              {isMailSending ? '인증번호 전송중' : '인증정보 전송'}
            </Button>
            <Button color='primary' className='w-full mt-[20px]' disabled={!mailSent} onClick={verifyToken}>
              인증
            </Button>
          </div>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
    </div>
  )
}

// 이메일을 쿼리스트링으로 받아서 클라이언트 사이드로 전달
export const getServerSideProps = ({ query }) => {
  return { props: { query, title: '메일 인증' } }
}
export default VerifyEmail

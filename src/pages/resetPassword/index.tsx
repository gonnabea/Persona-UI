import Link from 'next/link'
import Container from '@/components/dom/Container'
import Footer from '@/components/dom/Footer'
import Header from '@/components/dom/Header'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import { Input } from '@/components/dom/Forms'
import Button from '@/components/dom/Button'
import { useState } from 'react'
import { axiosClient } from '@/axios.config'
import { DefaultValues, useForm } from 'react-hook-form'

interface FormValues {
  requestResetPasswordEmailValues: {
    email: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  requestResetPasswordEmailValues: {
    email: '',
  },
}

const ResetPasswordIndex = () => {
  // 이메일 전송 요청 여부
  const [emailSendRequest, setEmailSendRequest] = useState(false)
  // 이메일 전송 성공 여부
  const [emailSent, setEmailSent] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  // 비밀번호 초기화 이메일 전송하기
  const sendEmail = async () => {
    setEmailSendRequest(true)
    try {
      await axiosClient.post('/verify/reset-password', {
        email: getValues('requestResetPasswordEmailValues.email'),
      })
      setEmailSent(true)
    } catch (error) {
      console.log(error)
    }
    setEmailSendRequest(false)
  }

  // 이메일 전송 시 페이지 전환
  if (emailSent) {
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
            <h2 className='mb-[40px]'>메일이 성공적으로 전송되었습니다.</h2>
            <p>메일함에서 비밀번호 초기화 URL로 이동해주세요.</p>
          </div>
        </Container>
      </div>
    )
  }

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
          <h2 className='mb-[40px]'>비밀번호 변경</h2>
          <form className='w-full grid lg:w-[320px] justify-items-center' onSubmit={handleSubmit(sendEmail)}>
            <Input
              errorMessage={errors.requestResetPasswordEmailValues?.email?.message}
              className='w-full'
              label='이메일'
              type='email'
              {...register('requestResetPasswordEmailValues.email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <p className='text-xs text-gray-500'>
              가입할때 사용한 메일을 통해 비밀번호 변경 요청을 시도합니다. 회원가입에 사용한 메일에서 복사한 인증번호를
              입력해주세요.
            </p>
            <Button color='primary' className='w-full mt-[20px]' disabled={emailSendRequest}>
              비밀번호 변경 요청
            </Button>
          </form>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
    </div>
  )
}

export const getServerSideProps = () => {
  return { props: { title: '비밀번호 초기화' } }
}

export default ResetPasswordIndex

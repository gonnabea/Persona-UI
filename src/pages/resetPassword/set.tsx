import Link from 'next/link'
import Container from '@/components/dom/Container'
import Footer from '@/components/dom/Footer'
import Header from '@/components/dom/Header'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import { Input } from '@/components/dom/Forms'
import Button from '@/components/dom/Button'
import { DefaultValues, useForm } from 'react-hook-form'
import { axiosClient } from '@/axios.config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface FormValues {
  resetPassword: {
    password: string
    password2: string
  }
}

const defaultValues: DefaultValues<FormValues> = {
  resetPassword: {
    password: '',
    password2: '',
  },
}

const SetPassword = ({ query }) => {
  // 비밀번호 폼 요청여부
  const [changePasswordRequested, setPasswordChangeRequested] = useState(false)
  const { token } = query
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const requestResetPassword = async () => {
    setPasswordChangeRequested(true)
    try {
      await axiosClient.post('/auth/reset-password', {
        password: getValues('resetPassword.password'),
        password2: getValues('resetPassword.password'),
        token: token,
      })
      // 성공 시 토스트 전송 후 로그인 페이지로 반환
      toast('비밀번호가 성공적으로 변경되었습니다.')
      router.push('/signin')
    } catch (error) {
      console.log(error)
    }
    setPasswordChangeRequested(false)
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
          <form className='w-full grid lg:w-[320px] justify-items-center' onSubmit={handleSubmit(requestResetPassword)}>
            <Input
              errorMessage={errors.resetPassword?.password?.message}
              className='w-full'
              label='비밀번호'
              type='password'
              {...register('resetPassword.password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            <Input
              errorMessage={errors.resetPassword?.password2?.message}
              className='w-full'
              label='비밀번호 확인'
              type='password'
              {...register('resetPassword.password2', {
                required: '입력했던 비밀번호와 일치하지 않습니다.',
                validate: (value: string) => {
                  if (watch('resetPassword.password') !== value) {
                    return '비밀번호가 일치하지 않습니다.'
                  }
                },
              })}
            />
            <Button color='primary' className='w-full mt-[20px]' disabled={changePasswordRequested}>
              비밀번호 변경하기
            </Button>
          </form>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
    </div>
  )
}

export const getServerSideProps = ({ query }) => {
  return { props: { query, title: '비밀번호 초기화' } }
}

export default SetPassword

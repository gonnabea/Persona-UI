import Link from 'next/link'
import Router from 'next/router'
import { SubmitHandler, useForm, DefaultValues } from 'react-hook-form'

import isArrayEquals from '@/utils/array/isArrayEquals'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import { CheckboxList } from '@/components/dom/Forms'
import Header from '@/components/dom/Header'
import Container from '@/components/dom/Container'
import Button from '@/components/dom/Button'
import Footer from '@/components/dom/Footer'
import Modal from '@/components/dom/Modal'
import useToggle from '@/hooks/useToggle'
import ScrollBox from '@/components/dom/ScrollBox'
import { ChangeEvent } from 'react'
import isContainsAll from '@/utils/array/isContainsAll'

const termsCheckOptions = ['serviceTerms', 'privacyTerms', 'newsletter'] as const
type TermsCheckList = (typeof termsCheckOptions)[number]

interface FormValues {
  termsCheckList: TermsCheckList[]
  checkAll: 'all' | false
}

const defaultValues: DefaultValues<FormValues> = {
  termsCheckList: [],
}

const SignUpTerms = () => {
  const [isTermsToggled, toggleTerms] = useToggle(false)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })
  const termsCheckboxLists = [
    { title: '모두 동의', description: '', highlight: true, value: 'all', register: register('checkAll') },
    {
      title: '서비스 이용약관 동의(필수)',
      description: '',
      onSideButtonClick: toggleTerms,
      highlight: false,
      value: 'serviceTerms',
    },
    {
      title: '개인정보 수집 및 이용동의(필수)',
      onSideButtonClick: () => {
        console.log('clicked 1')
      },
      highlight: false,
      value: 'privacyTerms',
    },
    {
      title: '게임 플레이 등에 유용한 소식 받기',
      description: '업데이트, 사전등록, 이벤트 참가 등 도움되는 정보를 받습니다.',
      highlight: false,
      value: 'newsletter',
    },
  ]

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { termsCheckList } = data

    // 필수 이용 약관 체크했는지 확인
    if (isContainsAll<TermsCheckList>(termsCheckList, ['serviceTerms', 'privacyTerms'])) {
      return Router.push({ pathname: '/signup/create', query: { ...data } })
    } else {
      setError('termsCheckList', {
        type: 'required',
        message: '서비스 이용약관 동의 및 개인정보 수집 및 이용동의 모두 동의해주세요.',
      })
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    // 전체 선택을 눌렀을 때
    if (getValues('checkAll') === 'all' && value === 'all') {
      setValue('termsCheckList', [...termsCheckOptions])
    }
    if (getValues('checkAll') === false && value === 'all') {
      setValue('termsCheckList', [])
    }

    // 다른 체크박스를 선택했는데 전체 체크인 경우
    if (isArrayEquals<TermsCheckList>(getValues('termsCheckList'), [...termsCheckOptions]) && value !== 'all') {
      setValue('checkAll', 'all')
    }
    if (!isArrayEquals<TermsCheckList>(getValues('termsCheckList'), [...termsCheckOptions]) && value !== 'all') {
      setValue('checkAll', false)
    }

    if (!isContainsAll<TermsCheckList>(getValues('termsCheckList'), ['serviceTerms', 'privacyTerms'])) {
      setError('termsCheckList', {
        type: 'required',
        message: '서비스 이용약관 동의 및 개인정보 수집 및 이용동의 모두 동의해주세요.',
      })
    } else {
      clearErrors('termsCheckList')
    }
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
          <h2>약관동의</h2>
          <form className='grid w-[400px] justify-items-center' onSubmit={handleSubmit(onSubmit)}>
            <CheckboxList
              id='terms'
              name='terms'
              className='w-full mt-[40px]'
              items={termsCheckboxLists}
              globalRegister={register('termsCheckList')}
              onChange={onChange}
            />
            <p className='w-full text-left text-red-500 text-[12px] mt-[10px] mb-[40px]'>
              {errors.termsCheckList?.message}
            </p>
            <Button color='primary'>다음</Button>
          </form>
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
      <Modal
        active={isTermsToggled}
        toggle={toggleTerms}
        headerChildren={
          <>
            <h3 className='text-center'>서비스 이용약관 동의(필수)</h3>
          </>
        }
        bodyChildren={
          <ScrollBox className='w-[440px] h-[330px]'>
            <>
              <h3>Lorem ipsum</h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu metus. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur malesuada magna sem, eget
              hendrerit nisl fringilla et. Aenean vulputate, nibh eu hendrerit pharetra, lectus massa hendrerit mi, eget
              aliquet ex nisi ac urna. Phasellus non diam convallis, rhoncus lectus sit amet, ullamcorper elit.
              Curabitur rutrum mollis dignissim. Phasellus blandit vehicula sodales. Curabitur nisi magna, ultricies
              quis massa volutpat, sodales luctus elit. Vivamus laoreet ex ut elit pretium commodo. Maecenas pulvinar ac
              arcu eget condimentum. Donec aliquet urna sed tempor sollicitudin. Cras volutpat maximus tincidunt.
              Maecenas neque tellus, vulputate id lobortis quis, porta id mauris. Proin placerat, felis nec finibus
              vulputate, erat odio condimentum neque, eget venenatis risus nisl nec lorem. Aenean scelerisque rutrum
              magna, sit amet malesuada ligula pharetra quis. Praesent gravida quam quis mauris volutpat placerat. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent id arcu
              massa. Morbi dignissim venenatis erat sodales ullamcorper. Fusce a dignissim sem. Donec in viverra ligula.
              Etiam vel feugiat diam, blandit congue justo. Fusce feugiat, magna quis consectetur dignissim, erat dolor
              iaculis odio, sed cursus nulla dolor eu turpis. Vivamus nulla risus, suscipit a felis quis, mollis
              suscipit lorem. Vestibulum id suscipit ipsum, ac tempus ligula. Curabitur at orci non elit posuere mollis
              in nec dui. Sed aliquet aliquam quam, eget iaculis augue porttitor eget. Nulla felis arcu, condimentum
              vitae hendrerit eget, aliquam at tortor. Integer maximus metus eu mi aliquet, eu ultrices leo rutrum. Sed
              a lectus ac nibh pellentesque accumsan. Pellentesque facilisis ut enim et scelerisque. Suspendisse arcu
              purus, bibendum rutrum volutpat efficitur, placerat nec leo. Pellentesque eget eros quis odio tincidunt
              egestas. Suspendisse enim ante, rhoncus sed arcu sodales, interdum feugiat arcu. Maecenas et enim vitae
              nibh sodales blandit suscipit in dui. Aliquam erat volutpat. In condimentum posuere orci eget finibus.
              Praesent imperdiet vestibulum lectus eu porta. Curabitur pellentesque, purus et tempor ornare, quam dui
              imperdiet dolor, non gravida turpis urna sit amet augue. Nunc laoreet tellus purus. Mauris lacus nisi,
              aliquam quis sodales congue, accumsan vel purus. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Nunc a feugiat urna. Fusce convallis velit at orci semper, eu interdum
              justo ornare. Sed ut scelerisque lorem, eu consequat urna. Cras molestie sollicitudin lectus at egestas.
            </>
          </ScrollBox>
        }
        footerChildren={
          <div className='grid grid-cols-2 gap-x-[10px]'>
            <Button
              color='secondary'
              onClick={() => {
                toggleTerms()
              }}>
              닫기
            </Button>
            <Button color='primary'>동의</Button>
          </div>
        }
      />
    </div>
  )
}

export default SignUpTerms

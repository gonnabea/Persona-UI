import Link from 'next/link'
import Container from '@/components/dom/Container'
import Footer from '@/components/dom/Footer'
import Header from '@/components/dom/Header'
import PersonaBI from '@/assets/icons/persona-bi.svg'
import { Input } from '@/components/dom/Forms'
import Button from '@/components/dom/Button'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DefaultValues, useForm } from 'react-hook-form'

const testList = {
    larry_connors_rsi: {
        name: 'larry_connors_rsi'
    },
    bnf: {
        name: 'bnf'
    },
    larry_williams: {
        name: 'larry_williams'
    },
    turtle: {
        name: 'turtle'
    }
}

type ApiParams = {
    ticker: string;
    start: string;
    end: string;
    first_rsi4: number;
    second_rsi4: number;
    sell_rsi4: number;
}

interface FormValues {
  apiParams: ApiParams;
}

const Backtest = () => {

  const [selectedTest, setSelectedTest] = useState(testList['larry_connors_rsi'].name);
  const [testResult, setTestResult] = useState(null);

  const router = useRouter()

  const defaultValues: DefaultValues<FormValues> = {
      apiParams: {
          ticker: 'QQQ',
          start: '2020-01-01',
          end: '2021-01-01',
          first_rsi4: 30,
          second_rsi4: 25,
          sell_rsi4: 80
      }
    }
    

    const onSubmit = async (params: ApiParams) => {
      try {
        const result = await axios.get('http://localhost:8000/larry_connors_rsi4', {
            method: 'GET',           // 명시
            params: params ? params : defaultValues.apiParams,
            withCredentials: false,  // ⭐ 강제로 false 설정
            headers: {}   
        })
        console.dir(result);
        setTestResult(result.data)
      } catch (error) {
        console.error(error)
      }
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
          <h2 className='mb-[20px]'>주식 백테스트</h2>

          <select className='mb-[20px]' onChange={(e) => setSelectedTest(e.target.value)}>
            <option value={testList.larry_connors_rsi.name}>
                래리 코너스의 RSI 역추세 기법
            </option>
            <option value={testList.bnf.name}>
                BNF의 역추세 기법
            </option>
            <option value={testList.larry_williams.name}>
                래리 윌리엄스의 변곡점 매매
            </option>
            <option value={testList.turtle.name}>
                터틀트레이더의 추세추종
            </option>
          </select>

          {selectedTest === 'larry_connors_rsi' && 
           <form onSubmit={(e) => {
            console.log(e.target['ticker'])
            e.preventDefault();
            const values = {
                ticker: e.target['ticker'].value,
                first_rsi4: Number(e.target['first_rsi4'].value),
                second_rsi4: Number(e.target['second_rsi4'].value),
                start: e.target['start'].value,
                end: e.target['end'].value,
                sell_rsi4: Number(e.target['sell_rsi4'].value)
            }
            console.log(values)
            onSubmit(values)
           }} className='w-full lg:w-[320px] justify-items-center'>
            {/* <p className='text-xs text-gray-500 text-center'>
              테스트를 원하는 종목의 티커를 적으세요
              <br/>
              (ex) 엔비디아: NVDA
            </p> */}
            <Input
              className='w-full'
              label='종목 티커'
              type='text'
              defaultValue={'QQQ'}
              name='ticker'
            />

            <Input
              className='w-full'
              label='첫번째 매수 기준 rsi(4) 수치'
              type='number'
              defaultValue={30}
              name='first_rsi4'
            />
    

            <Input
              className='w-full'
              label='두번쨰 매수 기준 rsi(4) 수치'
              type='number'
              defaultValue={25}
              name='second_rsi4'
            />

              <Input
              className='w-full'
              label='매도 기준 rsi(4) 수치'
              type='number'
              defaultValue={80}
              name='sell_rsi4'
            />

            <Input
              className='w-full'
              label='시작일'
              type='date'
              name='start'
            />

            <Input
              className='w-full'
              label='종료일'
              type='date'
              name='end'
            />

            <Button color='primary' className='w-full mt-[20px]'>
              테스트 시작
            </Button>
          </form>
          }
        
        {testResult && <div className='flex flex-col items-center'>
            <span>종목명: {testResult.ticker}</span>
            <span>초기 자산: {testResult.seed_money}</span>
            <span>최종 자산: {testResult.result_money}</span>
            <span>테스트 기간: {testResult.test_period}</span>


            </div>
           

        }
         
        </div>
      </Container>
      <Footer>© BIGINNING All Rights Reserved.</Footer>
    </div>
  )
}

export const getServerSideProps = () => {
  return { props: { title: 'Stock lab' } }
}

export default Backtest

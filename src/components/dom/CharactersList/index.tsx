import Scene from '@/components/canvas/Scene'
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'

const CastelModel = dynamic(() => import('@/components/canvas/Castel'), { ssr: false })

const CharactersList = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <>
      <div ref={emblaRef} className=' overflow-hidden'>
        <div className='flex h-full'>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div className='mx-auto bg-white w-[210px] h-[300px]'>
              <Scene>
                <CastelModel />
              </Scene>
            </div>
            <div className='text-center [&>*]:text-white mt-[26px]'>
              <h5>여행ㄱ</h5>
              <p className='opacity-50 mb-[38px] mt-[10px]'>ENFP</p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div className='mx-auto bg-white w-[210px] h-[300px]'>
              <Scene>
                <CastelModel />
              </Scene>
            </div>
            <div className='text-center [&>*]:text-white mt-[26px]'>
              <h5>집에 있을래</h5>
              <p className='opacity-50 mb-[38px] mt-[10px]'>INTJ</p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div className='mx-auto bg-white w-[210px] h-[300px]'>
              <Scene>
                <CastelModel />
              </Scene>
            </div>
            <div className='text-center [&>*]:text-white mt-[26px]'>
              <h5>나도 집에 있을래...</h5>
              <p className='opacity-50 mb-[38px] mt-[10px]'>ISTJ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  return { props: { title: 'Characters' } }
}

export default CharactersList

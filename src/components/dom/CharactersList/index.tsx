import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import ArrowLeft from '@/assets/icons/arrow-left.svg'
import ArrowRight from '@/assets/icons/arrow-right.svg'
import Scene from '@/components/canvas/Scene'
import useEmblaCarousel from 'embla-carousel-react'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'

const Mutant = dynamic(() => import('@/components/canvas/characters/Mutant'), { ssr: false })
const Remy = dynamic(() => import('@/components/canvas/characters/Remy'), { ssr: false })
const Louise = dynamic(() => import('@/components/canvas/characters/Louise'), { ssr: false })

interface ChbaractesListProps {
  title?: boolean
  titleClassName?: string
  carouselClassName?: string
  carouselItemClassName?: string
  carouselArrowButtonClassName?: string
  carouselArrowClassName?: string
}

const CharactersList = ({
  title,
  titleClassName,
  carouselClassName,
  carouselItemClassName,
  carouselArrowButtonClassName,
  carouselArrowClassName,
}: ChbaractesListProps) => {
  const [emblaRef, embla] = useEmblaCarousel()
  // const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  // const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  return (
    <div className='flex'>
      <div className='flex items-center justify-center'>
        <Button
          color='transparent'
          useIcon={true}
          onClick={scrollPrev}
          className={twMerge(`
            bg-black
            bg-opacity-20
            rounded-full
            py-[18px]
            ${carouselArrowButtonClassName}
          `)}>
          <ArrowLeft className={`${carouselArrowClassName}`} />
        </Button>
      </div>
      <div
        ref={emblaRef}
        className={twMerge(`
          overflow-hidden
          ${carouselClassName}
        `)}>
        <div className='flex h-full'>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div
              className={twMerge(`
                mx-auto
                w-[210px]
                h-[300px]
                ${carouselItemClassName}
              `)}>
              <Scene>
                <Mutant position-y={-2.5} />
              </Scene>
            </div>
            {title ? (
              <div className={`text-center mt-[26px] ${titleClassName}`}>
                <h5>여행ㄱ</h5>
                <p className='opacity-50 mb-[38px] mt-[10px]'>ENFP</p>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div
              className={twMerge(`
                mx-auto
                w-[210px]
                h-[300px]
                ${carouselItemClassName}
              `)}>
              <Scene>
                <Remy position-y={-2.75} />
              </Scene>
            </div>
            {title ? (
              <div className={`text-center mt-[26px] ${titleClassName}`}>
                <h5>집에 있을래</h5>
                <p className='opacity-50 mb-[38px] mt-[10px]'>INTJ</p>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%]'>
            <div
              className={twMerge(`
                mx-auto
                w-[210px]
                h-[300px]
                ${carouselItemClassName}
              `)}>
              <Scene>
                <Louise position-y={-3} />
              </Scene>
            </div>
            {title ? (
              <div className={`text-center mt-[26px] ${titleClassName}`}>
                <h5>나도 집에 있을래...</h5>
                <p className='opacity-50 mb-[38px] mt-[10px]'>ISTJ</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Button
          color='transparent'
          useIcon={true}
          onClick={scrollNext}
          className={twMerge(`
            bg-black
            bg-opacity-20
            rounded-full
            py-[18px]
            ${carouselArrowButtonClassName}
          `)}>
          <ArrowRight className={`${carouselArrowClassName}`} />
        </Button>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  return { props: { title: 'Characters' } }
}

export default CharactersList

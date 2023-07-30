import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import ArrowLeft from '@/assets/icons/arrow-left.svg'
import ArrowRight from '@/assets/icons/arrow-right.svg'
import Scene from '@/components/canvas/Scene'
import useEmblaCarousel from 'embla-carousel-react'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'

const Amy = dynamic(() => import('@/components/canvas/characters/Amy'), { ssr: false })
const Mutant = dynamic(() => import('@/components/canvas/characters/Mutant'), { ssr: false })
const Remy = dynamic(() => import('@/components/canvas/characters/Remy'), { ssr: false })
const Louise = dynamic(() => import('@/components/canvas/characters/Louise'), { ssr: false })

interface ChbaractesListProps {
  title?: boolean
  titleClassName?: string
  carouselContainerClassName?: string
  carouselClassName?: string
  carouselItemClassName?: string
  carouselArrowButtonClassName?: string
  carouselArrowClassName?: string
  setState?: Dispatch<SetStateAction<string>>
}

const CharactersList = ({
  title,
  titleClassName,
  carouselContainerClassName,
  carouselClassName,
  carouselItemClassName,
  carouselArrowButtonClassName,
  carouselArrowClassName,
  setState,
}: ChbaractesListProps) => {
  const [emblaRef, embla] = useEmblaCarousel()
  const carouselItemsRef = useRef(null)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  useEffect(() => {
    if (carouselItemsRef) {
      const characterList = carouselItemsRef.current.querySelectorAll('div.character')

      embla &&
        embla.on('select', () => {
          const currentIndex = embla && embla.slidesInView(true)[0]
          setState(characterList[currentIndex].id)
        })

      setState(characterList[0].id)
    }
  }, [embla, setState])

  return (
    <div className={`flex ${carouselContainerClassName}`}>
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
        <div className='flex h-full' ref={carouselItemsRef}>
          <div
            className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%] character mb-[38px]'
            id='amy'>
            <div
              className={twMerge(`
                mx-auto
                w-[210px]
                h-[300px]
                ${carouselItemClassName}
              `)}>
              <Scene>
                <Amy position-y={-3} />
              </Scene>
            </div>
            {title ? (
              <div className={`text-center mt-[26px] ${titleClassName}`}>
                <h5>Amy</h5>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className='flex flex-col items-center justify-center h-full min-w-0 flex-[0_0_100%] character mb-[38px]'
            id='mutant'>
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
                <h5>Mutant</h5>
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

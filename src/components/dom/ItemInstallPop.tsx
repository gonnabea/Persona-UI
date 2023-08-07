import { isEditModeState } from '@/recoil/isEditMode/atom'
import { isExteriorInstallingState } from '@/recoil/isExteriorInstalling/atom'
import { ReactElement, useState } from 'react'
import { useRecoilState } from 'recoil'
import { JsxElement } from 'typescript'

interface props {
  carpets?: ReactElement<any, any>
  chairs?: ReactElement<any, any>
  lights?: ReactElement<any, any>
  electronics?: ReactElement<any, any>
  beauties?: ReactElement<any, any>
  writes?: ReactElement<any, any>
  exteriors?: ReactElement<any, any>
  furnitures?: ReactElement<any, any>
  tranings?: ReactElement<any, any>
}

const ItemInstallPop = ({ tranings, lights, electronics, beauties, writes, exteriors, furnitures }: props) => {
  const categories = ['건축', '가전', '조명', '장식', '가구', '훈련']

  const [selectedCategory, setSelectedCategory] = useState('건축')
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [isExteriorInstalling, setIsExteriorInstalling] = useRecoilState(isExteriorInstallingState)

  const selectCategory = () => {
    switch (selectedCategory) {
      case '훈련':
        return tranings

      case '조명':
        return lights

      case '가전':
        return electronics

      case '장식':
        return beauties

      // case '기록':
      //   return writes

      case '건축':
        return exteriors

      case '가구':
        return furnitures

      default:
        break
    }
  }

  return isEditMode ? (
    <div
      className='fixed top-0 left-0 z-10 mt-2 ml-6 font-bold rounded-lg opacity-90'
      style={{
        height: 250,
        width: 240,

        background: 'linear-gradient(90deg, #9C7FEF, #CEC4EA)',
      }}>
      <header className='w-full'>
        <div className='flex justify-around w-full pt-4 pb-4 pl-1 pr-1'>
          {categories.map((category, key) => {
            if (category === selectedCategory) {
              return (
                <span key={key} className='text-white cursor-pointer text-md'>
                  {selectedCategory}
                </span>
              )
            }

            return (
              <span
                key={key}
                onClick={() => {
                  setSelectedCategory(category)
                  // console.log(category)
                  if (category === '건축') setIsExteriorInstalling(true)
                  else setIsExteriorInstalling(false)
                }}
                className='cursor-pointer'>
                {category}
              </span>
            )
          })}
        </div>
      </header>
      <section
        onClick={(e) => e.stopPropagation()}
        className='h-full p-2 overflow-y-auto text-white'
        style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
        {selectCategory()}
      </section>
    </div>
  ) : null
}

export default ItemInstallPop

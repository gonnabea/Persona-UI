import { isEditModeState } from '@/recoil/isEditMode/atom'
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
  const categories = ['건축', '가전', '조명', '장식', '기록', '가구']

  const [selectedCategory, setSelectedCategory] = useState('건축')
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

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

      case '기록':
        return writes

      case '건축':
        return exteriors

      case '가구':
        return furnitures

      default:
        break
    }
  }

  return isEditMode ? (
    <div className='fixed top-0 left-0 z-10 font-bold bg-white opacity-90' style={{ height: 150, width: 220 }}>
      <header className=' w-full'>
        <ul className='flex justify-around w-full'>
          {categories.map((category, key) => {
            if (category === selectedCategory) {
              return (
                <li key={key} className='text-lg cursor-pointer text-fuchsia-600'>
                  {selectedCategory}
                </li>
              )
            }

            return (
              <li key={key} onClick={() => setSelectedCategory(category)} className='cursor-pointer'>
                {category}
              </li>
            )
          })}
        </ul>
      </header>
      <section onClick={(e) => e.stopPropagation()} className='h-full p-2 overflow-y-auto text-white bg-white'>
        {selectCategory()}
      </section>
    </div>
  ) : null
}

export default ItemInstallPop

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

const ItemInstallPop2 = ({ tranings, lights, electronics, beauties, writes, exteriors, furnitures }: props) => {
  const categories = ['건축', '가전', '조명', '장식', '기록', '가구', '훈련']

  const [selectedCategory, setSelectedCategory] = useState('건축')
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [isExteriorInstalling, setIsExteriorInstalling] = useRecoilState(isExteriorInstallingState)

  const getSelectCategoryName = () => {
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
    }
  }

  return isEditMode ? (
    <div
      className='fixed top-0 left-0 z-10 font-bold bg-white opacity-90'
      style={{
        height: 150,
        width: 240,

        background: 'linear-gradient(90deg, #9C7FEF, #CEC4EA)',
      }}>
      <span>건축</span>
      <span>가전</span>
      <span>조명</span>
      <span>가구</span>
      <span>훈련</span>
    </div>
  ) : null
}

export default ItemInstallPop2

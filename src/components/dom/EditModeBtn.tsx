import { isEditModeState } from '@/recoil/isEdisMode/atom'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

const EditModeBtn = () => {
  const [isEditMode, setIsEdieMode] = useRecoilState(isEditModeState)

  const toggleEditMode = () => {
    if(isEditMode === true) {
        setIsEdieMode(false)
    }
    else {
        setIsEdieMode(true)
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <button
      className='absolute p-4 text-center text-white rounded-full min-w-[150px] bg-[#8171C3] z-[2] bottom-[150px] right-[30px]'
      onClick={toggleEditMode}>
      {isEditMode === true ? '확인' : '수정 모드'}
    </button>
  )
}

export default EditModeBtn

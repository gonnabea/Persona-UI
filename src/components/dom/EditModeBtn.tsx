import { isEditModeState } from '@/recoil/isEditMode/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

const EditModeBtn = () => {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)

  const handleExitEditMode = () => {
    setSelectedItem(null)
  }

  const toggleEditMode = () => {
    if (isEditMode === true) {
      setIsEditMode(false)
      handleExitEditMode()
    } else {
      setIsEditMode(true)
    }
  }

  useEffect(() => {}, [])

  return (
    <button
      className='absolute p-4 text-center text-white rounded-full min-w-[150px] bg-[#8171C3] z-[2] bottom-[240px] right-[30px]'
      onClick={(event) => {
        event.stopPropagation()
        toggleEditMode()
      }}
      onContextMenuCapture={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}>
      {isEditMode === true ? '확인' : '수정 모드'}
    </button>
  )
}

export default EditModeBtn

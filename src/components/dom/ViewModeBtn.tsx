import { viewModeState } from '@/recoil/viewMode/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

const ViewModeBtn = () => {
  const [viewMode, setViewMode] = useRecoilState(viewModeState)
  //   const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)

  //   const handleExitViewMode = () => {
  //     setSelectedItem(null)
  //   }

  const toggleViewMode = () => {
    if (viewMode === 0) {
      setViewMode(1)
      //   handleExitViewMode()
    } else {
      setViewMode(0)
    }

    // console.log(viewMode)
  }

  useEffect(() => {}, [])

  return (
    <button
      className='absolute p-4 text-center text-white rounded-full min-w-[150px] bg-[#8171C3] z-[2] bottom-[150px] right-[30px]'
      onClick={(event) => {
        event.stopPropagation()
        toggleViewMode()
      }}
      onContextMenuCapture={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}>
      {viewMode === 0 ? '1인칭 모드' : '3인칭 모드'}
    </button>
  )
}

export default ViewModeBtn

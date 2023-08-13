import { itemsState } from '@/recoil/items/atom'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import { updateIndexState } from '@/recoil/forceUpdate/atom'

const RoofInstallUI = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [items, setItems] = useRecoilState(itemsState)
  const [updateIndex, forceUpdate] = useRecoilState(updateIndexState)

  return (
    <div
      style={{
        position: 'absolute',
        display: selectedItem && selectedItem.roofIndex >= 0 ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        top: '30vh',
        right: '30px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '20px',
        width: 150,
      }}>
      {/* 높이 위로 올리는 버튼 */}
      <div style={{ display: 'flex' }}>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()

              items.roof_1[selectedItem.roofIndex].position = [
                items.roof_1[selectedItem.roofIndex].position[0],
                items.roof_1[selectedItem.roofIndex].position[1] + 3,
                items.roof_1[selectedItem.roofIndex].position[2],
              ]

              items.roof_1[selectedItem.roofIndex].heightIndex += 1
              forceUpdate((updateIndex) => updateIndex + 1)
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',
              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            ⬆️+
          </button>
        </div>{' '}
        {/* 높이 아래로 내리는 버튼 */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              items.roof_1[selectedItem.roofIndex].position = [
                items.roof_1[selectedItem.roofIndex].position[0],
                items.roof_1[selectedItem.roofIndex].position[1] - 3,
                items.roof_1[selectedItem.roofIndex].position[2],
              ]

              items.roof_1[selectedItem.roofIndex].heightIndex -= 1
              forceUpdate((updateIndex) => updateIndex + 1)
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',
              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            ⬇️-
          </button>
        </div>
      </div>
      {/* 모델 회전 버튼 */}
      {/* <div
                    position={
                      items.roof_1[selectedItem.roofIndex].installing == true
                        ? [installingPos[0], installingPos[1], installingPos[2]]
                        : [
                            items.roof_1[selectedItem.roofIndex].position[0],
                            items.roof_1[selectedItem.roofIndex].position[1],
                            items.roof_1[selectedItem.roofIndex].position[2],
                          ]
                    }>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        items.roof_1[selectedItem.roofIndex].position = [
                          items.roof_1[selectedItem.roofIndex].position[0],
                          items.roof_1[selectedItem.roofIndex].position[1],
                          items.roof_1[selectedItem.roofIndex].position[2],
                        ]
                        items.roof_1[selectedItem.roofIndex].rotation = [
                          items.roof_1[selectedItem.roofIndex].rotation[0],
                          items.roof_1[selectedItem.roofIndex].rotation[1] + Math.PI / 2,
                          items.roof_1[selectedItem.roofIndex].rotation[2],
                        ]
                        
                      }}
                      style={{
                        
                        borderRadius: '100%',
                        padding: '10px',
                        // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
                      }}>
                      🔄️
                    </button>
                  </div> */}
      {/* 가로 크기 키우기 버튼 */}
      <div style={{ display: 'flex' }}>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (items.roof_1[selectedItem.roofIndex].scale[0] < 15) {
                items.roof_1[selectedItem.roofIndex].scale = [
                  items.roof_1[selectedItem.roofIndex].scale[0] + 0.2,
                  items.roof_1[selectedItem.roofIndex].scale[1],
                  items.roof_1[selectedItem.roofIndex].scale[2],
                ]
                forceUpdate((updateIndex) => updateIndex + 1)
              }
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',
              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            ⬅️➡️
          </button>
        </div>
        {/* 가로 크기 축소 버튼 */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (items.roof_1[selectedItem.roofIndex].scale[0] > 1) {
                items.roof_1[selectedItem.roofIndex].scale = [
                  items.roof_1[selectedItem.roofIndex].scale[0] - 0.2,
                  items.roof_1[selectedItem.roofIndex].scale[1],
                  items.roof_1[selectedItem.roofIndex].scale[2],
                ]
                forceUpdate((updateIndex) => updateIndex + 1)
              }
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',
              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            ➡️⬅️
          </button>
        </div>
      </div>
      {/* 세로 크기 키우기 버튼 */}
      <div style={{ display: 'flex' }}>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (items.roof_1[selectedItem.roofIndex].scale[2] < 15) {
                items.roof_1[selectedItem.roofIndex].scale = [
                  items.roof_1[selectedItem.roofIndex].scale[0],
                  items.roof_1[selectedItem.roofIndex].scale[1],
                  items.roof_1[selectedItem.roofIndex].scale[2] + 0.2,
                ]
                forceUpdate((updateIndex) => updateIndex + 1)
              }
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',
              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>⬆️</span>
              <span>⬇️</span>
            </div>
          </button>
        </div>
        {/* 세로 크기 축소 버튼 */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (items.roof_1[selectedItem.roofIndex].scale[2] > 1) {
                items.roof_1[selectedItem.roofIndex].scale = [
                  items.roof_1[selectedItem.roofIndex].scale[0],
                  items.roof_1[selectedItem.roofIndex].scale[1],
                  items.roof_1[selectedItem.roofIndex].scale[2] - 0.2,
                ]
                forceUpdate((updateIndex) => updateIndex + 1)
              }
            }}
            style={{
              borderRadius: '100%',
              padding: '10px',

              // opacity: !isEditMode || isExteriorInstalling ? 1 : 0,
            }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>⬇️</span>
              <span>⬆️</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoofInstallUI

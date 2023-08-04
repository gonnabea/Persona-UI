import { Html } from '@react-three/drei'
import { useRecoilState } from 'recoil'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useState, useEffect } from 'react'
import { newFloorState } from '@/recoil/newFloorPosition/atom'

const FloorInstallBtns = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [selectedItemPos, setSelectedItemPos] = useState({ x: 0, y: 0, z: 0 })
  const [renderIndex, forceRender] = useState(0)

  const [newFloor, setNewFloor] = useRecoilState(newFloorState)

  useEffect(() => {
    console.log(selectedItem)
    setTimeout(() => {
      if (selectedItem) {
        setSelectedItemPos(selectedItem.position)
      }
    }, 100)
  }, [selectedItem])

  return selectedItem && selectedItem.name === 'floor' && selectedItemPos ? (
    <>
      {/* side1 */}
      <Html position={[selectedItemPos.x + 2, selectedItemPos.y + 2, selectedItemPos.z + 0]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setNewFloor({
                position: { x: selectedItem.position.x + 2, y: selectedItem.position.y, z: selectedItem.position.z },
              })
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgba(20, 255, 0, 0.50)',
              padding: '10px',
              borderRadius: '20px',
            }}></div>
        ) : null}
      </Html>
      {/* side2 */}
      <Html position={[selectedItemPos.x - 2, selectedItemPos.y + 2, selectedItemPos.z + 0]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setNewFloor({
                position: {
                  x: selectedItem.position.x - 2,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z,
                },
              })
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgba(20, 255, 0, 0.50)',
              padding: '10px',
              borderRadius: '20px',
            }}></div>
        ) : null}
      </Html>
      {/* side2 */}
      <Html position={[selectedItemPos.x, selectedItemPos.y + 2, selectedItemPos.z + 2]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setNewFloor({
                position: {
                  x: selectedItem.position.x,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 2,
                },
              })
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgba(20, 255, 0, 0.50)',
              padding: '10px',
              borderRadius: '20px',
            }}></div>
        ) : null}
      </Html>
      <Html position={[selectedItemPos.x, selectedItemPos.y + 2, selectedItemPos.z - 2]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setNewFloor({
                position: {
                  x: selectedItem.position.x,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z - 2,
                },
              })
            }}
            style={{
              cursor: 'pointer',
              backgroundColor: 'rgba(20, 255, 0, 0.50)',
              padding: '10px',
              borderRadius: '20px',
            }}></div>
        ) : null}
      </Html>
    </>
  ) : null
}

export default FloorInstallBtns

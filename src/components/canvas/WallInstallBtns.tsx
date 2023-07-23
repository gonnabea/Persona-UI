import { Html } from '@react-three/drei'
import { useRecoilState } from 'recoil'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useState, useEffect } from 'react'
import { newWallState } from '@/recoil/newWallPosition/atom'

const WallInstallBtns = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [selectedItemPos, setSelectedItemPos] = useState({ x: 0, y: 0, z: 0 })
  const [renderIndex, forceRender] = useState(0)

  const [newWall, setNewWall] = useRecoilState(newWallState)

  useEffect(() => {
    console.log(selectedItem)
    setTimeout(() => {
      if (selectedItem) {
        setSelectedItemPos(selectedItem.position)
      }
    }, 100)
  }, [selectedItem])

  return selectedItem && selectedItemPos ? (
    <>
      <Html position={[selectedItemPos.x + 1, selectedItemPos.y + 2, selectedItemPos.z + 0]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={() => {
              setNewWall({
                position: { x: selectedItem.position.x + 2, y: selectedItem.position.y, z: selectedItem.position.z },
              })
            }}
            style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
        ) : null}
      </Html>
      <Html position={[selectedItemPos.x - 1, selectedItemPos.y + 2, selectedItemPos.z + 0]}>
        {selectedItem.rotation.y === 0 ? (
          <div
            onClick={() => {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 2,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z,
                },
              })
            }}
            style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
        ) : null}
      </Html>
      <Html position={[selectedItemPos.x - 1, selectedItemPos.y + 2, selectedItemPos.z + 1]}>
        <div
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
                rotation: { x: 0, y: 0, z: 0 },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
                rotation: { x: 0, y: -1.6, z: 0 },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html position={[selectedItemPos.x - 1, selectedItemPos.y + 2, selectedItemPos.z - 1]}>
        <div
          onClickCapture={(event) => {
            event.stopPropagation()
            console.log(selectedItem.position)
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z - 1,
                },
                rotation: { x: 0, y: 0, z: 0 },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z - 1,
                },
                rotation: { x: 0, y: -1.6, z: 0 },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html position={[selectedItemPos.x + 1, selectedItemPos.y + 2, selectedItemPos.z + 1]}>
        <div
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x + 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
                rotation: { x: 0, y: 0, z: 0 },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x + 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
                rotation: { x: 0, y: -1.6, z: 0 },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html
        onClickCapture={(event) => {
          event.stopPropagation()
          if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
            setNewWall({
              position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z - 2 },
              rotation: { x: 0, y: -1.6, z: 0 },
            })
          } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
            setNewWall({
              position: {
                x: selectedItem.position.x + 1,
                y: selectedItem.position.y,
                z: selectedItem.position.z - 1,
              },
              rotation: { x: 0, y: -1.6, z: 0 },
            })
          }
        }}
        position={[selectedItemPos.x + 1, selectedItemPos.y + 2, selectedItemPos.z - 1]}>
        <div
          onClick={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x + 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z - 1,
                },
                rotation: { x: 0, y: 0, z: 0 },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x + 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z - 1,
                },
                rotation: { x: 0, y: -1.6, z: 0 },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html position={[selectedItemPos.x + 0, selectedItemPos.y + 4, selectedItemPos.z + 0]}>
        <div
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y + 3, z: selectedItem.position.z },
                rotation: { x: selectedItem.rotation.x, y: selectedItem.rotation.y, z: selectedItem.rotation.z },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html position={[selectedItemPos.x + 0, selectedItemPos.y - 2, selectedItemPos.z + 0]}>
        <div
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y - 3, z: selectedItem.position.z },
              })
            }
          }}
          style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
      </Html>
      <Html position={[selectedItemPos.x + 0, selectedItemPos.y + 2, selectedItemPos.z + 2]}>
        {selectedItem.rotation.y !== 0 ? (
          <div
            onClickCapture={(event) => {
              event.stopPropagation()
              if (selectedItem.position.x) {
                setNewWall({
                  position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z + 2 },
                  rotation: { x: selectedItem.rotation.x, y: selectedItem.rotation.y, z: selectedItem.rotation.z },
                })
              }
            }}
            style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
        ) : null}
      </Html>
      <Html position={[selectedItemPos.x + 0, selectedItemPos.y + 2, selectedItemPos.z - 2]}>
        {selectedItem.rotation.y !== 0 ? (
          <div
            onClickCapture={(event) => {
              event.stopPropagation()
              if (selectedItem.position.x) {
                setNewWall({
                  position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z - 2 },
                  rotation: { x: selectedItem.rotation.x, y: selectedItem.rotation.y, z: selectedItem.rotation.z },
                })
              }
            }}
            style={{ cursor: 'pointer', backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}></div>
        ) : null}
      </Html>
    </>
  ) : null
}

export default WallInstallBtns

import { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useRecoilState } from 'recoil'
import { landClickPosState } from '@/recoil/landClickPos/atom'
import { landClickIndexState } from '@/recoil/landClickIndex/atom'
import { newWallState } from '@/recoil/newWallPosition/atom'
import { wallTextureState } from '@/recoil/wallTexture/atom'
import { isEditModeState } from '@/recoil/isEditMode/atom'

const WallInstallPop = ({ itemName }) => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)
  const [landClickPos, setLandClickPos] = useRecoilState(landClickPosState)
  const [landClickIndex, setLandClickIndex] = useRecoilState(landClickIndexState)
  const [newWall, setNewWall] = useRecoilState(newWallState)
  const [wallTexture, setWallTexture] = useRecoilState(wallTextureState)

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeState)

  const [updateIndex, forceUpdate] = useState(0)

  const handleScaleX = (e) => {
    if (selectedItem) {
      selectedItem.scale.x = e.target.value
      forceUpdate(updateIndex + 1)
      console.log(selectedItem)
    }
  }

  const handleScaleY = (e) => {
    if (selectedItem) {
      selectedItem.scale.y = e.target.value
      forceUpdate(updateIndex + 1)
    }
  }

  const handleScaleZ = (e) => {
    if (selectedItem) {
      selectedItem.scale.z = e.target.value
      forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationX = (e) => {
    if (selectedItem) {
      selectedItem.rotation.x = e.target.value
      forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationY = (e) => {
    if (selectedItem) {
      selectedItem.rotation.y = e.target.value
      forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationZ = (e) => {
    if (selectedItem) {
      selectedItem.rotation.z = e.target.value
      forceUpdate(updateIndex + 1)
    }
  }

  const addPositionX = () => {
    if (selectedItem) {
      selectedItem.position.x = (parseFloat(selectedItem.position.x) + 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  const addPositionY = () => {
    if (selectedItem) {
      selectedItem.position.y = (parseFloat(selectedItem.position.y) + 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  const addPositionZ = () => {
    if (selectedItem) {
      selectedItem.position.z = (parseFloat(selectedItem.position.z) + 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  const minusPositionX = () => {
    if (selectedItem) {
      selectedItem.position.x = (parseFloat(selectedItem.position.x) - 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  const minusPositionY = () => {
    if (selectedItem) {
      selectedItem.position.y = (parseFloat(selectedItem.position.y) - 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  const minusPositionZ = () => {
    if (selectedItem) {
      selectedItem.position.z = (parseFloat(selectedItem.position.z) - 0.1).toFixed(1)
      forceUpdate(updateIndex + 1)
    }
  }

  return isEditMode ? (
    <div
      className='fixed top-0 z-10 p-3 bg-gray-200 w-60 right-24'
      onContextMenuCapture={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onPointerMoveCapture={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}>
      <span className='pb-2 text-lg font-bold '>{itemName}</span>
      {selectedItem?.modelInfo?.name !== 'wall' ? (
        <div className='flex flex-col'>
          <span>크기 조절</span>
          <div className='flex items-center justify-center'>
            <span className='pr-2'>{`가로: ${selectedItem?.scale.x}`}</span>
            <input
              type='range'
              step={0.1}
              min={0.5}
              max={3}
              name='scaleX'
              value={selectedItem ? selectedItem.scale.x : null}
              onInput={(e) => handleScaleX(e)}
            />
          </div>

          <div className='flex items-center justify-center'>
            <span className='pr-2'>{`높이: ${selectedItem?.scale.y}`}</span>
            <input
              type='range'
              step={0.1}
              min={0.5}
              max={10}
              name='scaleY'
              value={selectedItem ? selectedItem.scale.y : null}
              onInput={(e) => handleScaleY(e)}
            />
          </div>

          <div className='flex items-center justify-center'>
            <span className='pr-2'>{`세로: ${selectedItem?.scale.z}`}</span>
            <input
              type='range'
              step={0.1}
              min={0.5}
              max={3}
              name='scaleZ'
              value={selectedItem ? selectedItem.scale.z : null}
              onInput={(e) => handleScaleZ(e)}
            />
          </div>
        </div>
      ) : null}

      <div className='flex flex-col'>
        <span>회전 조절</span>
        {/* <div className='flex items-center justify-center'>
          <span className='pr-2'>{`가로축: ${selectedItem?.rotation.x}`}</span>
          <input
            step={Math.PI / 8}
            type='range'
            min={0}
            max={Math.PI}
            name='rotationX'
            value={selectedItem ? selectedItem.rotation.x : null}
            onInput={(e) => handleRotationX(e)}
          />
        </div> */}

        <div className='flex items-center justify-center'>
          {/* <span className='pr-2'>{`세로축: ${Math.floor(selectedItem?.rotation.y / Math.PI)}`}</span> */}
          <span className='pr-2'>{`세로축`}</span>

          <input
            step={Math.PI / 8}
            type='range'
            min={0}
            max={3.1416}
            name='rotationY'
            value={selectedItem ? selectedItem.rotation.y : null}
            onInput={(e) => handleRotationY(e)}
          />
        </div>

        {/* <div className='flex items-center justify-center'>
                <span className='pr-2'>{`rotationZ: ${selectedItem?.rotation.z}`}</span>
                <input step={3.141592 / 8} type='range' min={0} max={3.141592} name="rotationZ" value={selectedItem ? selectedItem.rotation.z : null}  onInput={(e) => handleRotationZ(e)} />
            </div> */}
      </div>

      {/* <div className='flex justify-around w-full'>
        <button
          onClickCapture={(event) => {
            event.stopPropagation()
            console.log(selectedItem.position)
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z - 2 },
                rotation: { x: 0, y: -1.6, z: 0 },
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
          }}>
          LT
        </button>

        <button
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
          }}>
          RT
        </button>
      </div>

      <div className='flex justify-around w-full'>
        <button
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z + 2 },
                rotation: { x: 0, y: -1.6, z: 0 },
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
          }}>
          LB
        </button>

        <button
          onClickCapture={(event) => {
            event.stopPropagation()
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y, z: selectedItem.position.z + 2 },
                rotation: { x: 0, y: -1.6, z: 0 },
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
          }}>
          RB
        </button>
      </div>

      <div className='flex justify-around w-full'>
        <button
          onClickCapture={() => {
            if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: { x: selectedItem.position.x - 2, y: selectedItem.position.y, z: selectedItem.position.z },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x - 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
              })
            }
          }}>
          LL
        </button>
        <button
          onClickCapture={() => {
            if (selectedItem.position.x && selectedItem.rotation.y !== 0) {
              setNewWall({
                position: {
                  x: selectedItem.position.x + 1,
                  y: selectedItem.position.y,
                  z: selectedItem.position.z + 1,
                },
              })
            } else if (selectedItem.position.x && selectedItem.rotation.y === 0) {
              setNewWall({
                position: { x: selectedItem.position.x + 2, y: selectedItem.position.y, z: selectedItem.position.z },
              })
            }
          }}>
          RL
        </button>
      </div>

      <div className='flex justify-around w-full'>
        <button
          onClickCapture={(event) => {
            event.stopPropagation()
            if(selectedItem.position.x) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y + 3, z: selectedItem.position.z },
                rotation: { x: selectedItem.rotation.x, y: selectedItem.rotation.y, z: selectedItem.rotation.z },
              })
            }
          }}>
          T
        </button>
        <button
          onClickCapture={(event) => {
            event.stopPropagation()
            if(selectedItem.position.x) {
              setNewWall({
                position: { x: selectedItem.position.x, y: selectedItem.position.y - 3, z: selectedItem.position.z },
              })
            }
          }}>
          B
        </button>
      </div> */}

      <div className='flex justify-center w-full'>
        <div
          className='w-10 h-10 mr-4 border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_1.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_1.jpg')}>
          {wallTexture === '/img/wall_texture_1.jpg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10 mr-4 border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_2.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_2.jpg')}>
          {wallTexture === '/img/wall_texture_2.jpg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10  border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_3.jpeg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_3.jpeg')}>
          {wallTexture === '/img/wall_texture_3.jpeg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10  border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_4.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_4.jpg')}>
          {wallTexture === '/img/wall_texture_4.jpg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10  border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_5.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_5.jpg')}>
          {wallTexture === '/img/wall_texture_5.jpg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10  border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_texture_6.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_texture_6.jpg')}>
          {wallTexture === '/img/wall_texture_6.jpg' ? ' V' : ''}
        </div>
        <div
          className='w-10 h-10  border border-black border-solid rounded-lg cursor-pointer'
          style={{ backgroundImage: "url('/img/wall_wood.jpg')", backgroundSize: 'cover' }}
          onClick={() => setWallTexture('/img/wall_wood.jpg')}>
          {wallTexture === '/img/wall_wood.jpg' ? ' V' : ''}
        </div>
      </div>

      {/* <div className="flex flex-col">
            <span>위치 조정</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionX: ${selectedItem ? selectedItem.position.x : 0}`}</span>
                <button onClickCapture={() => addPositionX()}>+</button>
                <button onClickCapture={() => minusPositionX()}>-</button>

            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionY: ${selectedItem?.position.y}`}</span>
                <button onClickCapture={() => addPositionY()}>+</button>
                <button onClickCapture={() => minusPositionY()}>-</button>
            </div>

    
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionZ: ${selectedItem?.position.z}`}</span>
                <button onClickCapture={() => addPositionZ()}>+</button>
                <button onClickCapture={() => minusPositionZ()}>-</button>
            </div>

        </div> */}

      {/* <div>
            <span>회전</span>
            <div>
                <input type='range' name="scaleZ" onInput={(e) => selectedItem ? selectedItem.rotation.y = e.target.value : null} />
            </div>
        </div> */}
    </div>
  ) : null
}

export default WallInstallPop

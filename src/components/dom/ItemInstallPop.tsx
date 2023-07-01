import { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useRecoilState } from 'recoil'




const ItemInstallPop = ({ itemName,  }) => {

  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)

  const [updateIndex, forceUpdate] = useState(0);

  
  const handleScaleX = (e) => {
    if(selectedItem) {
        selectedItem.scale.x = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

  const handleScaleY = (e) => {
    if(selectedItem) {
        selectedItem.scale.y = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

  const handleScaleZ = (e) => {
    if(selectedItem) {
        selectedItem.scale.z = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationX = (e) => {
    if(selectedItem) {
        selectedItem.rotation.x = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationY = (e) => {
    if(selectedItem) {
        selectedItem.rotation.y = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

  const handleRotationZ = (e) => {
    if(selectedItem) {
        selectedItem.rotation.z = e.target.value;
        forceUpdate(updateIndex + 1)
    }
  }

    const addPositionX = () => {
    if(selectedItem) {
        selectedItem.position.x = (parseFloat(selectedItem.position.x) + 0.1).toFixed(1)
        forceUpdate(updateIndex + 1)
    }
  }

    const addPositionY = () => {
    if(selectedItem) {
        selectedItem.position.y = (parseFloat(selectedItem.position.y) + 0.1).toFixed(1)
        forceUpdate(updateIndex + 1)
    }
  }


    const addPositionZ = () => {
        if(selectedItem) {
            selectedItem.position.z = (parseFloat(selectedItem.position.z) + 0.1).toFixed(1)
            forceUpdate(updateIndex + 1)
        }
    }

    const minusPositionX = () => {
        if(selectedItem) {
            selectedItem.position.x = (parseFloat(selectedItem.position.x) - 0.1).toFixed(1)
            forceUpdate(updateIndex + 1)
        }
    }

    const minusPositionY = () => {
        if(selectedItem) {
            selectedItem.position.y = (parseFloat(selectedItem.position.y) - 0.1).toFixed(1)
            forceUpdate(updateIndex + 1)
        }
    }

    const minusPositionZ = () => {
        if(selectedItem) {
            selectedItem.position.z = (parseFloat(selectedItem.position.z) - 0.1).toFixed(1)
            forceUpdate(updateIndex + 1)
        }
    }






  return (
    <div className='fixed top-0 z-10 p-4 bg-gray-200 right-24' >
        <span className='pb-2 text-lg font-bold '>{itemName}</span>
        <div className="flex flex-col">
            {/* <span>크기 조절</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`너비: ${selectedItem?.scale.x}`}</span>
                <input type='range' step={0.5} min={0.5} max={20} name="scaleX" value={selectedItem ? selectedItem.scale.x : null}  onInput={(e) => handleScaleX(e)} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`높이: ${selectedItem?.scale.y}`}</span>
                <input type='range' step={0.5} min={0.5} max={10} name="scaleY" value={selectedItem ? selectedItem.scale.y : null}  onInput={(e) => handleScaleY(e)} />
            </div> */}

            {/* <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleZ: ${selectedItem?.scale.z}`}</span>
                <input type='range' step={0.5} min={0.5} max={0.5} name="scaleZ" value={selectedItem ? selectedItem.scale.z : null}  onInput={(e) => handleScaleZ(e)} />
            </div> */}

        </div>

        <div className="flex flex-col">
            <span>회전 조절</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`가로축: ${selectedItem?.rotation.x}`}</span>
                <input step={3.141592 / 8} type='range' min={0} max={3.141592} name="rotationX" value={selectedItem ? selectedItem.rotation.x : null}  onInput={(e) => handleRotationX(e)} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`세로축: ${selectedItem?.rotation.y}`}</span>
                <input step={3.141592 / 8} type='range' min={0} max={3.141592} name="rotationY" value={selectedItem ? selectedItem.rotation.y : null}  onInput={(e) => handleRotationY(e)} />
            </div>

            {/* <div className='flex items-center justify-center'>
                <span className='pr-2'>{`rotationZ: ${selectedItem?.rotation.z}`}</span>
                <input step={3.141592 / 8} type='range' min={0} max={3.141592} name="rotationZ" value={selectedItem ? selectedItem.rotation.z : null}  onInput={(e) => handleRotationZ(e)} />
            </div> */}

        </div>

        {/* <div className="flex flex-col">
            <span>위치 조정</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionX: ${selectedItem ? selectedItem.position.x : 0}`}</span>
                <button onClick={() => addPositionX()}>+</button>
                <button onClick={() => minusPositionX()}>-</button>

            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionY: ${selectedItem?.position.y}`}</span>
                <button onClick={() => addPositionY()}>+</button>
                <button onClick={() => minusPositionY()}>-</button>
            </div>

    
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionZ: ${selectedItem?.position.z}`}</span>
                <button onClick={() => addPositionZ()}>+</button>
                <button onClick={() => minusPositionZ()}>-</button>
            </div>

        </div> */}

        {/* <div>
            <span>회전</span>
            <div>
                <input type='range' name="scaleZ" onInput={(e) => selectedItem ? selectedItem.rotation.y = e.target.value : null} />
            </div>
        </div> */}
    </div>
  )
}

export default ItemInstallPop;

import { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useRecoilState } from 'recoil'




const ItemInstallPop = ({ itemName,  }) => {

  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)

  const [updateIndex, forceUpdate] = useState(0);


  return (
    <div className='fixed top-0 z-10 p-4 bg-gray-200 right-24'>
        <span className='pb-2 text-lg font-bold '>{itemName}</span>
        <div className="flex flex-col">
            <span>크기 조절</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleX: ${selectedItem?.scale.x}`}</span>
                <input type='range' min={0.1} max={20} name="scaleX" value={selectedItem ? selectedItem.scale.x : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.x = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleY: ${selectedItem?.scale.y}`}</span>
                <input type='range' min={1} max={10} name="scaleY" value={selectedItem ? selectedItem.scale.y : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.y = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleZ: ${selectedItem?.scale.z}`}</span>
                <input type='range' min={0.1} max={20} name="scaleZ" value={selectedItem ? selectedItem.scale.z : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.z = e.target.value : null} />
            </div>

        </div>

        <div className="flex flex-col">
            <span>회전 조절</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`rotationX: ${selectedItem?.rotation.x}`}</span>
                <input step={0.1} type='range' min={0} max={20} name="rotationX" value={selectedItem ? selectedItem.rotation.x : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.rotation.x = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`rotationY: ${selectedItem?.rotation.y}`}</span>
                <input step={0.1} type='range' min={0} max={10} name="rotationY" value={selectedItem ? selectedItem.rotation.y : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.rotation.y = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`rotationZ: ${selectedItem?.rotation.z}`}</span>
                <input step={0.1} type='range' min={0} max={20} name="rotationZ" value={selectedItem ? selectedItem.rotation.z : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.rotation.z = e.target.value : null} />
            </div>

        </div>

        <div className="flex flex-col">
            <span>위치 조정</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionX: ${selectedItem?.position.x}`}</span>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.x = parseFloat(selectedItem.position.x) + 0.1 : null}>+</button>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.x = parseFloat(selectedItem.position.x) - 0.1 : null}>-</button>



            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionY: ${selectedItem?.position.y}`}</span>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.y = parseFloat(selectedItem.position.y) + 0.1 : null}>+</button>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.y = parseFloat(selectedItem.position.y) - 0.1 : null}>-</button>
            </div>

    
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionZ: ${selectedItem?.position.z}`}</span>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.z = parseFloat(selectedItem.position.z) + 0.1 : null}>+</button>
                <button onMouseDown={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.z = parseFloat(selectedItem.position.z) - 0.1 : null}>-</button>
            </div>

        </div>

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

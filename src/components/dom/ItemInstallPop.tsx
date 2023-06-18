import { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from './Container'
import { selectedItemState } from '@/recoil/selectedItem/atom'
import { useRecoilState } from 'recoil'




const ItemInstallPop = ({ itemName,  }) => {

  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState)

  const [updateIndex, forceUpdate] = useState(0);


  return (
    <div className='absolute z-10 p-4 bg-gray-200 right-10 top-24'>
        <span className='pb-2 text-lg font-bold '>{itemName}</span>
        <div className="flex flex-col">
            <span>크기 조절</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleX: ${selectedItem?.scale.x}`}</span>
                <input type='range' min={1} max={20} name="scaleX" value={selectedItem ? selectedItem.scale.x : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.x = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleY: ${selectedItem?.scale.y}`}</span>
                <input type='range' min={1} max={10} name="scaleY" value={selectedItem ? selectedItem.scale.y : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.y = e.target.value : null} />
            </div>

            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`scaleZ: ${selectedItem?.scale.z}`}</span>
                <input type='range' min={1} max={20} name="scaleZ" value={selectedItem ? selectedItem.scale.z : null} onMouseMove={() => forceUpdate(updateIndex + 1)}  onInput={(e) => selectedItem ? selectedItem.scale.z = e.target.value : null} />
            </div>

        </div>

        <div className="flex flex-col">
            <span>위치 조정</span>
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionX: ${selectedItem?.position.x}`}</span>
                <button onMouseUp={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.x = parseInt(selectedItem.position.x) + 1 : null}>+</button>
                <button onMouseUp={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.x = parseInt(selectedItem.position.x) - 1 : null}>-</button>



            </div>

    
            <div className='flex items-center justify-center'>
                <span className='pr-2'>{`positionZ: ${selectedItem?.position.z}`}</span>
                <button onMouseUp={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.z = parseInt(selectedItem.position.z) + 1 : null}>+</button>
                <button onMouseUp={() => forceUpdate(updateIndex + 1)} onClick={() => selectedItem ? selectedItem.position.z = parseInt(selectedItem.position.z) - 1 : null}>-</button>
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

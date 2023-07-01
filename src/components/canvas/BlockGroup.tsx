
import { useState } from 'react'
import Block from './Block';

function BlockGroup() {
    const [blockStates, setBlockStates] = useState([
        {
            position: [1,0,1]
        },
                {
            position: [2,0,2]
        },
                {
            position: [3,0,3]
        },
                {
            position: [4,0,4]
        },
                {
            position: [5,0,5]
        },
                {
            position: [6,0,6]
        }
    ])

    for(let i = 0 ; i < 6; i++) {
        return <Block blockState={blockStates[i]} setBlockStates={setBlockStates} />
    }
    
}

export default BlockGroup;
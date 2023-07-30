import { atom } from 'recoil'

export const itemsState = atom({
  key: 'items',
  default: {
    door_1: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
      installing: false,
   },
   roof_1: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
      installing: false,
   },
  floor_1: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
      installing: false,
   },
  window_1: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
      installing: false,
   },
    window_2: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
      installing: false,
   },
    bed_1: [
      {
         position: [0,0,0],
         rotation: [0,0,0],
         installed: false,
         installing: false,
      },
      {
         position: [0,0,0],
         rotation: [0,0,0],
         installed: false,
         installing: false,
      },
      {
         position: [0,0,0],
         rotation: [0,0,0],
         installed: false,
         installing: false,
      },
   ],
  changeIndex: 0
},
dangerouslyAllowMutability: true
})
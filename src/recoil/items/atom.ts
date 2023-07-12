import { atom } from 'recoil'

export const itemsState = atom({
  key: 'items',
  default: {
    door_1: {
      position: [0,0,0],
      rotation: [0,0,0],
      installed: false,
  }
},
})
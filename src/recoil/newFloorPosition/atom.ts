import { atom } from 'recoil'

export const newFloorState = atom({
  key: 'loader',
  default: null,
  dangerouslyAllowMutability: true
})

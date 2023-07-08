import { atom } from 'recoil'

export const newWallState = atom({
  key: 'loader',
  default: null,
  dangerouslyAllowMutability: true
})

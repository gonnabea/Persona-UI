import { atom } from 'recoil'

export const colyseusRoomState = atom({
  key: 'colyseusRoom',
  default: null,
  dangerouslyAllowMutability: true
})

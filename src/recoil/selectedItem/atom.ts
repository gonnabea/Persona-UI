import { atom } from 'recoil'

export const selectedItemState = atom({
  key: 'selectedItem',
  default: null,

  dangerouslyAllowMutability: true
})

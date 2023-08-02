import { atom } from 'recoil'

export const selectedExteriorItemState = atom({
  key: 'selectedExteriorItem',
  default: null,
  dangerouslyAllowMutability: true
})

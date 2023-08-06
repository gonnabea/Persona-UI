import { atom } from 'recoil'

export const viewModeState = atom({
  key: 'viewMode',
  default: 0, // 0: 1인칭 모드, 1: 2인칭 모드

  dangerouslyAllowMutability: true
})

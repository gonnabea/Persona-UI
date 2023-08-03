import { atom } from 'recoil'

export const wallTextureState = atom({
  key: 'wallTexture',
  default: "/img/wall_wood.jpg",

  dangerouslyAllowMutability: true
})

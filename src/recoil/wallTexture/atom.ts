import { atom } from 'recoil'

export const wallTextureState = atom({
  key: 'wallTexture',
  default: "/img/wall_texture_2.jpg",

  dangerouslyAllowMutability: true
})

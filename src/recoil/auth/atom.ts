import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type KeepSignInState = boolean

export const keepSignInState = atom({
  key: 'keepSignIn',
  default: false,
  effects: [persistAtom],
})

export type AuthState = {
  accessToken: string
  refreshToken: string
}

const authState = atom({
  key: 'auth',
  default: {
    accessToken: '',
    refreshToken: '',
  },
  effects: [persistAtom],
})

export default authState

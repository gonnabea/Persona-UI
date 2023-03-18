import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type Auth = {
  accessToken: string
  refreshToken: string
}

const auth = atom({
  key: 'auth',
  default: {
    accessToken: '',
    refreshToken: '',
  },
  effects: [persistAtom],
})

export default auth

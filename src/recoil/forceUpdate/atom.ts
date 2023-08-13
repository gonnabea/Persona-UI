import { atom } from 'recoil'

// 상태가 변경되었는데도 화면이 리렌더링 되지 않을 시를 위한 강제 상태변경 (임시조치)
export const updateIndexState = atom({
  key: 'updateIndex',
  default: 0,
})

import * as Colyseus from 'colyseus.js'

// Recoil state
const authState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('recoil-persist')).auth : {}
const accessToken = authState?.accessToken

// Colyseus functions
export const colyseusClient = new Colyseus.Client(process.env.NEXT_PUBLIC_SOCKET_URL)
export const joinRoom = (roomName: string, options?: { [key: string]: any }) =>
  colyseusClient.joinOrCreate(roomName, { accessToken, ...options })

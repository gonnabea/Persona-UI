import * as Colyseus from 'colyseus.js'

// Recoil state
const authState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('recoil-persist')).auth : {}



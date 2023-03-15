import * as Colyseus from 'colyseus.js'

export const colyseusClient = new Colyseus.Client(process.env.NEXT_PUBLIC_SOCKET_URL)

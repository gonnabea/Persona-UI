import { createContext } from 'react'
import * as Colyseus from 'colyseus.js'

export const ColyseusContext = createContext<Colyseus.Client | undefined>(undefined)

const ColyseusProvider = ({ children }) => {
  const client = new Colyseus.Client('ws://localhost:2567')

  return <ColyseusContext.Provider value={client}>{children}</ColyseusContext.Provider>
}

export default ColyseusProvider

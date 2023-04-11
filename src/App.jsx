import React, { useState } from 'react'
import Room from './components/Room'
import roomData from './data'
import { nanoid } from 'nanoid'

function App() {
const RoomElement = roomData.map((room)=> <Room key={nanoid()} number={room.number} checked={room.checked}/>)
 


  return (
    <div className="app">
     {RoomElement}
    </div>
  )
}

export default App

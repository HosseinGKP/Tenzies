import './styles/App.css'
import Die from "./components/Die"
import { useState } from 'react'
import { nanoid } from "nanoid"

function App(){
  
  const [dice, setDice] = useState(generateAllNewDice())
  
  function generateAllNewDice(){
    return new Array(10)
    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
    
  }
  
  function rollDice(){
    setDice(generateAllNewDice())
  }

  function hold(id){
    setDice(prevDice => {
      return prevDice.map((dieObj) => {
        return dieObj.id === id ? 
          {...dieObj, isHeld : !dieObj.isHeld} :
          dieObj
      })
    })
  }

  const diceElement = dice.map(dieObj =>
    <Die
      key = {dieObj.id}
      id = {dieObj.id}
      value = {dieObj.value}
      isHeld = {dieObj.isHeld}
      hold = {() => hold(dieObj.id)}
    />
  )


  return(
    <>
      <main>

        <div className='dice-container'>
        {diceElement}
        </div>

        <button onClick={rollDice} className='roll-button'>Roll</button>
      </main>
    </>
  )
}

export default App

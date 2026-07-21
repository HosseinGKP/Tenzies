import './styles/App.css'
import Die from "./components/Die"
import { useState } from 'react'
import { nanoid } from "nanoid"

function App(){
  
  const [dice, setDice] = useState(generateAllNewDice())
  const isWon = dice.every(die =>
    die.value === dice[0].value && die.isHeld
  )
  
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
    setDice(prevDice => prevDice.map(dieObj =>
      dieObj.isHeld ? dieObj:
        {...dieObj, value:  Math.ceil(Math.random() * 6)}
    ))
  }

  function hold(id){
    setDice(prevDice => prevDice.map((dieObj) => 
      dieObj.id === id ? 
        {...dieObj, isHeld : !dieObj.isHeld} :
        dieObj
    ))
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

        <h1 className='title-h1'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
        {diceElement}
        </div>

        <button onClick={rollDice} className='roll-button'>{
        isWon ? "New Game": "Roll"
        }</button>
      
      </main>
    </>
  )
}

export default App

import './styles/App.css'
import Die from "./components/Die"
import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function App(){
  
  const [dice, setDice] = useState(() => generateAllNewDice())
  const isWon = dice.every(die =>
    die.value === dice[0].value && die.isHeld
  )
  const { width, height } = useWindowSize()
  const rollFocusRef = useRef(null)
  const [time, setTime] = useState(0)


  useEffect(() => {
    if(isWon) return
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1)
    }, 1000);

    return () => clearInterval(interval)
  }, [isWon])
  
  useEffect(() => {
    if(isWon){
      rollFocusRef.current.focus()
    }
  },[isWon])

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
    if (!isWon){
      setDice(prevDice => prevDice.map(dieObj =>
        dieObj.isHeld ? dieObj:
          {...dieObj, value:  Math.ceil(Math.random() * 6)}
      ))
    }else{
      setDice(generateAllNewDice())
      setTime(0)
    }
  }

  function hold(id){
    setDice(prevDice => prevDice.map((dieObj) => 
      dieObj.id === id ? 
        {...dieObj, isHeld : !dieObj.isHeld} :
        dieObj
    ))
  }
``

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
        <div className='timer-dev'>
          <p>Time: {time} sec</p>
        </div>

      <main>

        <div aria-live="polite" className='sr-only'>
            {isWon && <p className='sr-only'>Congratulations! You won! press "New Game" to play agai man.</p>}
        </div>
          
          <h1 className='title-h1'>Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
          {diceElement}
          </div>

            <button
              ref={rollFocusRef}
              onClick={rollDice} className='roll-button'>
                {isWon ? "New Game": "Roll"}
            </button>

          {isWon ? <Confetti 
            width={width}
            height={height}
          />: null}


      </main>
    </>
  )
}

export default App

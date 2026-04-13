import { useState } from 'react'
import './Calculator.css'

function calculate(a, op, b) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0 ? 'Error' : a / b
    default: return b
  }
}

function fmt(val) {
  if (val === 'Error') return 'Error'
  if (typeof val === 'number' && !isFinite(val)) return 'Error'
  if (typeof val === 'number' && Math.abs(val) > 1e10) return val.toExponential(6)
  if (typeof val === 'number' && Math.abs(val) < 1e-6 && val !== 0) return val.toExponential(6)
  if (typeof val === 'number') return parseFloat(val.toFixed(10)).toString()
  return val
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [history, setHistory] = useState('')
  const [first, setFirst] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  function inputDigit(d) {
    if (display === 'Error') {
      setDisplay(d)
      setHistory('')
      setFirst(null)
      setOperator(null)
      setWaitingForSecond(false)
      return
    }
    if (waitingForSecond) {
      setDisplay(d)
      setWaitingForSecond(false)
      return
    }
    if (display.length > 16) return
    setDisplay(display === '0' ? d : display + d)
  }

  function inputDecimal() {
    if (display === 'Error') {
      setDisplay('0.')
      setHistory('')
      setFirst(null)
      setOperator(null)
      setWaitingForSecond(false)
      return
    }
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  function clear() {
    setDisplay('0')
    setHistory('')
    setFirst(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  function clearEntry() {
    setDisplay('0')
  }

  function toggleSign() {
    if (display === 'Error') return
    if (display === '0') return
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)
  }

  function handleOperator(op) {
    if (display === 'Error') return
    const val = parseFloat(display)
    if (first !== null && operator && !waitingForSecond) {
      const result = calculate(first, operator, val)
      setFirst(result === 'Error' ? null : result)
      setDisplay(fmt(result))
      setHistory(`${fmt(result)} ${op}`)
      setOperator(op)
      setWaitingForSecond(true)
    } else {
      setFirst(val)
      setOperator(op)
      setHistory(`${fmt(val)} ${op}`)
      setWaitingForSecond(true)
    }
  }

  function handleEquals() {
    if (display === 'Error') return
    if (first === null || !operator) return
    const val = parseFloat(display)
    const result = calculate(first, operator, val)
    setHistory(`${fmt(first)} ${operator} ${fmt(val)} =`)
    setDisplay(fmt(result))
    setFirst(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const isError = display === 'Error'

  return (
    <div className="calculator">
      <div className="display">
        <div className="display-history">{history}</div>
        <div className="display-current">{display}</div>
      </div>
      <div className="buttons">
        {/* Row 1 */}
        <button className="btn btn-clear" onClick={clear}>C</button>
        <button className="btn btn-clear" onClick={clearEntry}>CE</button>
        <button className="btn btn-fn" onClick={toggleSign}>±</button>
        <button className="btn btn-op" onClick={() => handleOperator('/')}>÷</button>

        {/* Row 2 */}
        <button className="btn btn-digit" onClick={() => inputDigit('7')}>7</button>
        <button className="btn btn-digit" onClick={() => inputDigit('8')}>8</button>
        <button className="btn btn-digit" onClick={() => inputDigit('9')}>9</button>
        <button className="btn btn-op" onClick={() => handleOperator('*')}>×</button>

        {/* Row 3 */}
        <button className="btn btn-digit" onClick={() => inputDigit('4')}>4</button>
        <button className="btn btn-digit" onClick={() => inputDigit('5')}>5</button>
        <button className="btn btn-digit" onClick={() => inputDigit('6')}>6</button>
        <button className="btn btn-op" onClick={() => handleOperator('-')}>−</button>

        {/* Row 4 */}
        <button className="btn btn-digit" onClick={() => inputDigit('1')}>1</button>
        <button className="btn btn-digit" onClick={() => inputDigit('2')}>2</button>
        <button className="btn btn-digit" onClick={() => inputDigit('3')}>3</button>
        <button className="btn btn-op" onClick={() => handleOperator('+')}>+</button>

        {/* Row 5 */}
        <button className="btn btn-digit btn-zero" onClick={() => inputDigit('0')}>0</button>
        <button className="btn btn-digit" onClick={inputDecimal}>.</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}
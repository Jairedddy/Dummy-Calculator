import { useState } from 'react'
import './Calculator.css'

const toRad = (deg) => (deg * Math.PI) / 180

function calculate(a, op, b) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0 ? 'Error' : a / b
    case '^': return Math.pow(a, b)
    default: return b
  }
}

function applyUnary(val, fn) {
  switch (fn) {
    case 'sin': return Math.sin(toRad(val))
    case 'cos': return Math.cos(toRad(val))
    case 'tan': return Math.tan(toRad(val))
    case 'ln': return val <= 0 ? 'Error' : Math.log(val)
    case 'log': return val <= 0 ? 'Error' : Math.log10(val)
    case 'sqrt': return val < 0 ? 'Error' : Math.sqrt(val)
    case 'sq': return val * val
    case '1/x': return val === 0 ? 'Error' : 1 / val
    default: return val
  }
}

function fmt(val) {
  if (val === 'Error') return 'Error'
  const n = parseFloat(val)
  if (isNaN(n)) return 'Error'
  // Avoid floating-point noise like 0.10000000000000001
  const s = parseFloat(n.toPrecision(12)).toString()
  return s
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [history, setHistory] = useState('')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  function inputDigit(digit) {
    if (waitingForSecond) {
      setDisplay(digit)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  function inputDecimal() {
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  function toggleSign() {
    setDisplay(fmt(parseFloat(display) * -1))
  }

  function percent() {
    setDisplay(fmt(parseFloat(display) / 100))
  }

  function clear() {
    setDisplay('0')
    setHistory('')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  function clearEntry() {
    setDisplay('0')
  }

  function handleOperator(op) {
    const current = parseFloat(display)
    if (firstOperand !== null && !waitingForSecond) {
      const result = calculate(firstOperand, operator, current)
      const resultStr = fmt(result)
      setHistory(`${fmt(firstOperand)} ${op}`)
      setDisplay(resultStr)
      setFirstOperand(parseFloat(resultStr))
    } else {
      setFirstOperand(current)
      setHistory(`${fmt(current)} ${op}`)
    }
    setOperator(op)
    setWaitingForSecond(true)
  }

  function handleEquals() {
    if (operator === null || waitingForSecond) return
    const current = parseFloat(display)
    const result = calculate(firstOperand, operator, current)
    const resultStr = fmt(result)
    setHistory(`${fmt(firstOperand)} ${operator} ${fmt(current)} =`)
    setDisplay(resultStr)
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  function handleUnary(fn) {
    const val = parseFloat(display)
    const result = applyUnary(val, fn)
    const label = { sin: 'sin', cos: 'cos', tan: 'tan', ln: 'ln', log: 'log', sqrt: '√', sq: 'sqr', '1/x': '1/' }[fn]
    setHistory(`${label}(${fmt(val)}) =`)
    setDisplay(fmt(result))
    setWaitingForSecond(false)
  }

  function inputConstant(val, label) {
    setHistory(label)
    setDisplay(fmt(val))
    setWaitingForSecond(false)
  }

  const isError = display === 'Error'

  return (
    <div className="calculator">
      <div className="display">
        <div className="display-history">{history || '\u00a0'}</div>
        <div className="display-current">{display}</div>
      </div>

      <div className="buttons">
        {/* Row 1 */}
        <button className="btn btn-fn" onClick={() => handleUnary('sin')}>sin</button>
        <button className="btn btn-fn" onClick={() => handleUnary('cos')}>cos</button>
        <button className="btn btn-fn" onClick={() => handleUnary('tan')}>tan</button>
        <button className="btn btn-op" onClick={() => handleOperator('^')}>xʸ</button>

        {/* Row 2 */}
        <button className="btn btn-fn" onClick={() => handleUnary('ln')}>ln</button>
        <button className="btn btn-fn" onClick={() => handleUnary('log')}>log</button>
        <button className="btn btn-fn" onClick={() => handleUnary('sqrt')}>√</button>
        <button className="btn btn-fn" onClick={() => handleUnary('sq')}>x²</button>

        {/* Row 3 */}
        <button className="btn btn-const" onClick={() => inputConstant(Math.PI, 'π')}>π</button>
        <button className="btn btn-const" onClick={() => inputConstant(Math.E, 'e')}>e</button>
        <button className="btn btn-fn" onClick={() => handleUnary('1/x')}>1/x</button>
        <button className="btn btn-fn" onClick={percent}>%</button>

        {/* Row 4 */}
        <button className="btn btn-clear" onClick={clear}>C</button>
        <button className="btn btn-clear" onClick={clearEntry}>CE</button>
        <button className="btn btn-fn" onClick={toggleSign}>±</button>
        <button className="btn btn-op" onClick={() => handleOperator('/')}>÷</button>

        {/* Row 5 */}
        <button className="btn btn-digit" onClick={() => inputDigit('7')}>7</button>
        <button className="btn btn-digit" onClick={() => inputDigit('8')}>8</button>
        <button className="btn btn-digit" onClick={() => inputDigit('9')}>9</button>
        <button className="btn btn-op" onClick={() => handleOperator('*')}>×</button>

        {/* Row 6 */}
        <button className="btn btn-digit" onClick={() => inputDigit('4')}>4</button>
        <button className="btn btn-digit" onClick={() => inputDigit('5')}>5</button>
        <button className="btn btn-digit" onClick={() => inputDigit('6')}>6</button>
        <button className="btn btn-op" onClick={() => handleOperator('-')}>−</button>

        {/* Row 7 */}
        <button className="btn btn-digit" onClick={() => inputDigit('1')}>1</button>
        <button className="btn btn-digit" onClick={() => inputDigit('2')}>2</button>
        <button className="btn btn-digit" onClick={() => inputDigit('3')}>3</button>
        <button className="btn btn-op" onClick={() => handleOperator('+')}>+</button>

        {/* Row 8 */}
        <button className="btn btn-digit btn-zero" onClick={() => inputDigit('0')}>0</button>
        <button className="btn btn-digit" onClick={inputDecimal}>.</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}

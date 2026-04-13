import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [first, setFirst] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [history, setHistory] = useState('');

  function inputDigit(digit) {
    if (display === 'Error') {
      setDisplay(digit);
      setHistory('');
      return;
    }
    if (waitingForSecond) {
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }

  function inputDecimal() {
    if (display === 'Error') {
      setDisplay('0.');
      setHistory('');
      return;
    }
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }

  function clearAll() {
    setDisplay('0');
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
    setHistory('');
  }

  function fmt(val) {
    if (typeof val === 'number') {
      if (Math.abs(val) > 1e10 || Math.abs(val) < 1e-6 && val !== 0) {
        return val.toExponential(6).replace(/\.0+e/, 'e').replace(/e\+?/, 'e');
      }
      return parseFloat(val.toFixed(10)).toString();
    }
    return val;
  }

  function handleOperator(nextOperator) {
    if (display === 'Error') return;
    const inputValue = parseFloat(display);
    if (operator && waitingForSecond) {
      setOperator(nextOperator);
      setHistory(`${fmt(first)} ${nextOperator}`);
      return;
    }
    if (first == null) {
      setFirst(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, first, inputValue);
      setDisplay(fmt(result));
      setFirst(result);
      setHistory(`${fmt(result)} ${nextOperator}`);
    }
    setOperator(nextOperator);
    setWaitingForSecond(true);
  }

  function performCalculation(op, firstVal, secondVal) {
    switch (op) {
      case '+':
        return firstVal + secondVal;
      case '-':
        return firstVal - secondVal;
      case '*':
        return firstVal * secondVal;
      case '/':
        if (secondVal === 0) return 'Error';
        return firstVal / secondVal;
      default:
        return secondVal;
    }
  }

  function handleEquals() {
    if (display === 'Error') return;
    if (operator == null || first == null) return;
    const secondVal = parseFloat(display);
    const result = performCalculation(operator, first, secondVal);
    setDisplay(fmt(result));
    setHistory(`${fmt(first)} ${operator} ${fmt(secondVal)}`);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  function handleSign() {
    if (display === 'Error') return;
    if (display === '0') return;
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  }

  function handlePercent() {
    if (display === 'Error') return;
    const val = parseFloat(display);
    setDisplay(fmt(val / 100));
  }

  function handleSqrt() {
    if (display === 'Error') return;
    const val = parseFloat(display);
    if (val < 0) {
      setDisplay('Error');
      setHistory(`√(${display})`);
      setFirst(null);
      setOperator(null);
      setWaitingForSecond(false);
      return;
    }
    setDisplay(fmt(Math.sqrt(val)));
    setHistory(`√(${fmt(val)})`);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  function handleSquare() {
    if (display === 'Error') return;
    const val = parseFloat(display);
    setDisplay(fmt(val * val));
    setHistory(`sqr(${fmt(val)})`);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  function handleReciprocal() {
    if (display === 'Error') return;
    const val = parseFloat(display);
    if (val === 0) {
      setDisplay('Error');
      setHistory(`1/(${display})`);
      setFirst(null);
      setOperator(null);
      setWaitingForSecond(false);
      return;
    }
    setDisplay(fmt(1 / val));
    setHistory(`1/(${fmt(val)})`);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  function handleLog() {
    if (display === 'Error') return;
    const val = parseFloat(display);
    if (val <= 0) {
      setDisplay('Error');
      setHistory(`log(${display})`);
      setFirst(null);
      setOperator(null);
      setWaitingForSecond(false);
      return;
    }
    const result = Math.log10(val);
    setDisplay(fmt(result));
    setHistory(`log(${fmt(val)})`);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  function handleTrig(fn) {
    if (display === 'Error') return;
    const val = parseFloat(display);
    if (isNaN(val)) {
      setDisplay('Error');
      setHistory(`${fn}(${display})`);
      setFirst(null);
      setOperator(null);
      setWaitingForSecond(false);
      return;
    }
    // Convert degrees to radians
    const radians = val * Math.PI / 180;
    let result;
    let hist;
    switch (fn) {
      case 'sin':
        result = Math.sin(radians);
        hist = `sin(${fmt(val)}°)`;
        break;
      case 'cos':
        result = Math.cos(radians);
        hist = `cos(${fmt(val)}°)`;
        break;
      case 'tan':
        // Handle tan(90 + k*180) where tan is undefined
        // We'll check if cos(radians) is close to 0
        if (Math.abs(Math.cos(radians)) < 1e-12) {
          setDisplay('Error');
          setHistory(`tan(${fmt(val)}°)`);
          setFirst(null);
          setOperator(null);
          setWaitingForSecond(false);
          return;
        }
        result = Math.tan(radians);
        hist = `tan(${fmt(val)}°)`;
        break;
      default:
        setDisplay('Error');
        setHistory(`${fn}(${display})`);
        setFirst(null);
        setOperator(null);
        setWaitingForSecond(false);
        return;
    }
    setDisplay(fmt(result));
    setHistory(hist);
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  }

  return (
    <div className="calculator">
      <div className="display">
        <div className="history">{history}</div>
        <div className="main-display">{display}</div>
      </div>
      <div className="buttons">
        {/* Row 1 */}
        <button className="btn btn-fn" onClick={clearAll}>AC</button>
        <button className="btn btn-fn" onClick={handleSign}>±</button>
        <button className="btn btn-fn" onClick={handlePercent}>%</button>
        <button className="btn btn-fn" onClick={handleSqrt}>√</button>
        <button className="btn btn-fn" onClick={handleSquare}>x²</button>
        <button className="btn btn-fn" onClick={handleReciprocal}>1/x</button>
        <button className="btn btn-fn" onClick={handleLog}>log</button>

        {/* Row 2 */}
        <button className="btn btn-sin" onClick={() => handleTrig('sin')}>sin</button>
        <button className="btn btn-cos" onClick={() => handleTrig('cos')}>cos</button>
        <button className="btn btn-tan" onClick={() => handleTrig('tan')}>tan</button>
        <button className="btn btn-op" onClick={() => handleOperator('*')}>×</button>

        {/* Row 3 */}
        <button className="btn btn-digit" onClick={() => inputDigit('7')}>7</button>
        <button className="btn btn-digit" onClick={() => inputDigit('8')}>8</button>
        <button className="btn btn-digit" onClick={() => inputDigit('9')}>9</button>
        <button className="btn btn-op" onClick={() => handleOperator('-')}>−</button>

        {/* Row 4 */}
        <button className="btn btn-digit" onClick={() => inputDigit('4')}>4</button>
        <button className="btn btn-digit" onClick={() => inputDigit('5')}>5</button>
        <button className="btn btn-digit" onClick={() => inputDigit('6')}>6</button>
        <button className="btn btn-op" onClick={() => handleOperator('+')}>+</button>

        {/* Row 5 */}
        <button className="btn btn-digit" onClick={() => inputDigit('1')}>1</button>
        <button className="btn btn-digit" onClick={() => inputDigit('2')}>2</button>
        <button className="btn btn-digit" onClick={() => inputDigit('3')}>3</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>

        {/* Row 6 */}
        <button className="btn btn-digit btn-zero" onClick={() => inputDigit('0')}>0</button>
        <button className="btn btn-digit" onClick={inputDecimal}>.</button>
      </div>
      <div className="trig-note" style={{fontSize: '0.8em', color: '#888', marginTop: '0.5em'}}>
        Trig functions use degrees
      </div>
    </div>
  );
}

export default Calculator;

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')
var isDecimal = false
//isBoolean es para saber si ya hay apretado un operador, es para operaciones mùltiples sin apretar calculate.
var isBoolean = false

 const calculate = (firstValue, operator, secondValue) => {
      let result = ''
      if (operator === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue)
      } else if (operator === 'subtract') {
        result = parseFloat(firstValue) - parseFloat(secondValue)
      } else if (operator === 'multiply') {
        result = parseFloat(firstValue) * parseFloat(secondValue)
      } else if (operator === 'divide') {
        result = parseFloat(firstValue) / parseFloat(secondValue)
      }
      return result 
        }

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const displayText = display.textContent
    const keyNum = key.textContent
    
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

      const previousKeyType = calculator.dataset.previousKeyType
  
        if (!action) {
      if (displayText === '0' || previousKeyType === 'operator') {
        display.textContent = keyNum
      } else {
        display.textContent = displayText + keyNum
      } 
        calculator.dataset.previousKeyType = 'number'
    }
    
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
    if  (isBoolean) {
      let calcValue = calculate(calculator.dataset.firstValue, calculator.dataset.operator, displayText)
      display.textContent = calcValue
      calculator.dataset.firstValue = calcValue
      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action 
      isDecimal = false
      isBoolean = true
      
    } else {
    
  key.classList.add('is-depressed')
  calculator.dataset.previousKeyType = 'operator'
  calculator.dataset.firstValue = displayText
  calculator.dataset.operator = action 
  isDecimal = false
  isBoolean = true
    }   
    }
      
    if (action === 'decimal') {
      if(!isDecimal) {
        display.textContent = displayText + '.'
      } 
      if (previousKeyType === 'operator') {
      display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
      isDecimal = true
    }

    if (action === 'clear') {
      display.textContent = '0'
      isDecimal = false
      calculator.dataset.previousKeyType = 'clear'
      isBoolean = false
    }

    if (action === 'calculate') {
      calculator.dataset.previousKeyType = 'calculate'
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayText
      isBoolean = false
      
     display.textContent = calculate(firstValue, operator, secondValue)
      }
    }
})

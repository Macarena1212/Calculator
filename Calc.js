const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')
var isDecimal = false


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
      if(displayText === '0' || previousKeyType === 'operator') {
        display.textContent = keyNum
      } else {
        display.textContent = displayText + keyNum
      } 
    }
    
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
  key.classList.add('is-depressed')
  calculator.dataset.previousKeyType = 'operator'
  calculator.dataset.firstValue = displayText
  calculator.dataset.operator = action
 
}
    
    if (action === 'decimal') {
      if(!isDecimal || previousKeyType === 'operator') {
        display.textContent = displayText + '.'
        isDecimal = true
      }
      
    }

    if (action === 'clear') {
      display.textContent = '0'
      isDecimal = false
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayText
      const calculate = (firstValue, operator, secondValue => {
      let result = ''
      
      if (operator === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue)
      } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
      } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
      } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
      }
       display.textContent = calculate(firstValue, operator, secondValue)
      return result
        }
        )} 
      }
})

 var current  = '0';
    var previous = '';
    var operator = null;
    var justCalc = false;

    var resultEl = document.getElementById('result');
    var exprEl   = document.getElementById('expr');

    function updateDisplay() {
      resultEl.textContent = current;

      // Shrink font for long numbers
      var len = current.length;
      resultEl.className = 'result' + (len > 12 ? ' xsmall' : len > 8 ? ' small' : '');

      var opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' };
      exprEl.textContent = previous + (operator ? ' ' + (opSymbol[operator] || operator) : '');
    }

    function pressNum(num) {
      if (justCalc) { current = num; justCalc = false; }
      else if (current === '0') { current = num; }
      else { current = current + num; }
      updateDisplay();
    }

    function pressDot() {
      if (justCalc) { current = '0.'; justCalc = false; }
      else if (current.indexOf('.') === -1) { current = current + '.'; }
      updateDisplay();
    }

    function setOp(op) {
      justCalc = false;
      if (operator && previous !== '') { calculate(); }
      previous = current;
      operator = op;
      current  = '0';
      updateDisplay();
    }

    function calculate() {
      if (!operator || previous === '') return;
      var a   = parseFloat(previous);
      var b   = parseFloat(current);
      var res;
      if (operator === '+') res = a + b;
      if (operator === '-') res = a - b;
      if (operator === '*') res = a * b;
      if (operator === '/') res = (b !== 0) ? a / b : 'Error';
      previous = '';
      operator = null;
      current  = (res === 'Error') ? 'Error' : parseFloat(res.toFixed(10)).toString();
      justCalc = true;
      updateDisplay();
    }

    function clearAll() {
      current = '0'; previous = ''; operator = null; justCalc = false;
      updateDisplay();
    }

    function toggleSign() {
      if (current !== '0' && current !== 'Error') {
        current = (parseFloat(current) * -1).toString();
        updateDisplay();
      }
    }

    function percent() {
      if (current !== 'Error') {
        current = (parseFloat(current) / 100).toString();
        updateDisplay();
      }
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key >= '0' && e.key <= '9') pressNum(e.key);
      else if (e.key === '.') pressDot();
      else if (e.key === '+') setOp('+');
      else if (e.key === '-') setOp('-');
      else if (e.key === '*') setOp('*');
      else if (e.key === '/') { e.preventDefault(); setOp('/'); }
      else if (e.key === 'Enter' || e.key === '=') calculate();
      else if (e.key === 'Escape') clearAll();
      else if (e.key === 'Backspace') {
        if (current.length > 1) { current = current.slice(0, -1); }
        else { current = '0'; }
        updateDisplay();
      }
    });
    if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("service-worker.js");

}


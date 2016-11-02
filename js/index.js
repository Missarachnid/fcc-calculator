$(document).ready(function() {
  // I can add, subtract, multiply and divide two numbers
  //I can clear the input field with the input 
  // I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output

  var calcInput = [];
  var current = [];
  var result = "0";
  var lastAnswer = "";
  var temp = "";
  var $input = $(".input");
  var signs = ["+", "-", "/", "*"];
  var index = calcInput.length - 1;
  var currIndex = current.length - 1;
  
//function to complete an operation after = or multiple sign pushes
  var check = function() {
    calcInput.push(current.join(""));
    result = eval(calcInput.join(""));
    lastAnswer = result;
    calcInput.length = 0;
    current.length = 0;
  };


  $input.val(result);
  //keeps focus on the input    
  $(".input").focus(); 
   $(".input").on('focusOut',function () { 
  var inputField = $(this); 
  setTimeout(function() {
  inputField.focus();
  }, 10);
  });

  //prevents keypresses from operating calculator
  $input.keypress(function() {
    return false;
  });

  //clear button 
  $("#allClear").click(function() {
    calcInput.length = 0;
    current.length = 0;
    $input.val("0");
  });

  //back button
  $("#back").click(function() {
    if (current.length > 0) {
      current.pop();
      $input.val(current.join(""));
    } else {
      return false;
    }
  });
//CE Button
  $("#last").click(function() {
    current.length = 0;
    calcInput.length = 0;
    current.push(lastAnswer);
    $input.val(current.join(""));
  });

  //Number Buttons
  $(".number").click(function() {
    current.push($(this).val());
    $input.val(current.join(""));
  });

  //Operator Buttons
  $(".sign").click(function() {
    if ($.inArray(calcInput[index], signs) !== -1 && current.length === 0) {
      calcInput.pop();
      calcInput.push($(this).val());
    } else if (current[currIndex] === ".") {
      return false;
    }else if (current.length === 0){
      return false;
    } else if (calcInput.length === 2) {
      check();
      calcInput.push(result);
      calcInput.push($(this).val());
      $input.val(result);
    } else {
      $input.val(temp);
      calcInput.push(current.join(""));
      calcInput.push($(this).val());
      current.length = 0;
    }
  });
//Positive/Negative toggle
  $("#posNeg").click(function() {
    if (current[0] === "-") {
      current.shift();
      $input.val(current.join(""));
    } else {
      current.unshift("-");
      $input.val(current.join(""));
    }
  });

  //Decimal Point Button
  $("#decimal").click(function() {
    if ($.inArray(".", current) === -1) {
      current.push($(this).val());
      $input.val(current.join(""));
    } else {
      return false;
    }
  });

  //Equal Button
  $("#equal").click(function() {
    if(current.length === 0){
      return false;
    }else if (current.length > 0) {
      calcInput.push(current.join(""));
    } else if ($.inArray(calcInput[index], signs) !== -1) {
      return false;
    }
    check();
    current.push(result);
    $input.val(current);
  });

});
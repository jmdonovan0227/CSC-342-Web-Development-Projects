// keep track of the index in results history
let resultsIdx = 0;

// keep track of when we need to disable buttons
let disableButtons = false;

// keep track of when we need to clear the screen (ex: when we have the first_number and and an operator)
let lineReset = false;

// Keep track of all parsed input from input field in this object
let expression = {
    // we might need to check when we have first_number
    hasFirst: false,
    //
    hasOper: false,
    // first number we want to perform an operation on
    first_number: '',
    // operator we will use for the operation
    operator: '',
    // second number we will use to perform an operation
    second_number: ''
};

// Keep track of all calculations made here
// This should help with making history section and also using values for
// for intermediate computations
let resultsHistory = {
    all_results: []
};

// create a clickable scrollable list (probably with event listeners)
// so we can use numbers in history list for calculations

// Keep track of when we click a button on screen
// Make sure everything is loaded in before we click on any buttons
document.addEventListener('DOMContentLoaded', (e) =>  {
    // newer method for finding object, in this case an equals button we created
    // Uses DOM
    
    // clear the input box (aka screen)
    document.querySelector( "#inputfield" ).value = "";
    // reference to equals btn
    let equalsButton = document.querySelector( "#equalsbtn" );
    // reference to zero btn
    let zeroButton = document.querySelector( "#zero" );
    // reference to one btn
    let oneButton = document.querySelector( "#one" );
    // reference to two btn
    let twoButton = document.querySelector( "#two" );
    // reference to three btn
    let threeButton = document.querySelector( "#three" );
    // reference to four btn
    let fourButton = document.querySelector( "#four" );
    // reference to five btn
    let fiveButton = document.querySelector( "#five" );
    // reference to six btn
    let sixButton = document.querySelector( "#six" );
    // reference to seven btn
    let sevenButton = document.querySelector( "#seven" );
    // reference to eight btn
    let eightButton = document.querySelector( "#eight" );
    // reference to nine btn
    let nineButton = document.querySelector( "#nine" );
    // reference to plus btn
    let plusButton = document.querySelector( "#plus" );
    // reference to sub btn
    let subButton = document.querySelector( "#sub" );
    // reference to mul btn
    let mulButton = document.querySelector( "#mult" );
    // reference to div btn
    let divButton = document.querySelector( "#divi" );
    // referecne to textbox
    let textBox = document.querySelector( "#inputfield" );
    // reference to period aka float btn
    let floatButton = document.querySelector( "#float" );
    // reference to flip sign btn
    let flipSignButton = document.querySelector( "#flipsign" );
    // reference to clear screen btn
    let clearScreenButton = document.querySelector( "#clearScreen" );
    // reference to clear history btn
    let clearHistoryButton = document.querySelector( "#clearHistory" );

    // check for key presses
    textBox.addEventListener( 'keydown', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // check for a valid key which are operators and numbers
            if( !isValidInput( e.key ) ){
                e.preventDefault();
    
                if( e.key == "-" || e.key == "+" || e.key == "/" || e.key == "*" ){
                    addOper( e.key );
                }
            }

            // if we have a valid key...
            else {
                // still allow addNumber() function to handle adding numbers
                if( e.key != "Backspace" && e.key != " " ) {
                    e.preventDefault();
                }
    
                // number or period for floats, make sure to stop user from typing invalid floats
                if( (e.key).match(/[0-9]/) || e.key == "." ) {
                    if( e.key == "." ) {
                        check_float( e.key );
                    }
    
                    else {
                        // this is catch the f key with numbers from being inserted as valid input
                        if( !e.key.match( /[a-zA-Z]/ ) ) {
                            addNumber( e.key );
                        }
                    }
                }

                // allow user to solve expression by pressing enter
                else if( e.key == "Enter" && expression.hasFirst && expression.hasOper && expression.second_number != "" ) {
                    solveExpression();
                    expression.hasOper = false;
                    expression.operator = "";
                }

                // if user uses backspace to clear a value and it is the first number meaning we haven't typed a first number
                // or an operator just clear the expression
                else if( e.key == "Backspace" && textBox.value.length == 1 && !expression.hasOper ) {
                    clearExpression();
                }

                // if we have a first number and an expression just clear the second number so it doesn't carry over in the expression
                else if( e.key == "Backspace" && textBox.value.length == 1 && expression.hasOper ) {
                    // just set the second_number to be empty
                    expression.second_number = "";
                }
            }
        }
    });

    // check when clear screen button is clicked
    clearScreenButton.addEventListener( 'click', (e) => {
        clearExpression();
    });

    // check when clear history button is clicked
    clearHistoryButton.addEventListener( 'click', (e) => {
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            clearHistory();
        }
    });

    // check when flip sign button is clicked
    flipSignButton.addEventListener( 'click', (e) => {
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            flipSign();
        }
    });

    // Create a JS Event for when we click equals button
    equalsButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        // check if we have a valid expression
        else {
            if( expression.hasFirst && expression.hasOper && expression.second_number != "" ) {
                solveExpression();
                // make sure to reset the operator if we did not click multiple operators to continue an expression
                expression.hasOper = false;
                expression.operator = "";
            }
        }
    });

    // check when zero button is clicked
    zeroButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when one button is clicked
    oneButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when two button is clicked
    twoButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when three button is clicked
    threeButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when four button is clicked
    fourButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when five button is clicked
    fiveButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when six button is clicked
    sixButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when seven button is clicked
    sevenButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when eight button is clicked
    eightButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when nine button is clicked
    nineButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            // pass a parsed int for zero to addNumber function
            addNumber( e.target.innerHTML );
        }
    });

    // check when plus button is clicked
    plusButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            addOper( e.target.innerHTML );
        }
    });

    // check when sub button is clicked
    subButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            addOper( e.target.innerHTML );
        }
    });

    // check when div button is clicked
    divButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            addOper( e.target.innerHTML );
        }
    });

    // check when mul button is clicked
    mulButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            addOper( e.target.innerHTML );
        }
    });

    // check when the period or float button is clicked
    floatButton.addEventListener( 'click', (e) => {
        // if we have an error disable default behavior
        if( disableButtons ) {
            e.preventDefault();
        }

        else {
            check_float( e.target.innerHTML );
        }
    });
});

// add numbers to our current expression
function addNumber( number ) {
    // if we don't have our first value in the expression
    if( !expression.hasFirst ) {
        // add the string value for number to first_number
        // in our expression object
        expression.first_number += number;
    }

    // if we have the first value in the expression
    else {
        if( !lineReset && expression.hasOper ) {
            //
            document.querySelector( "#inputfield" ).value = "";
            lineReset = true;
        }

        if( expression.hasFirst && !expression.hasOper ) {
            expression.first_number += number;
        }

        else {  
            // add the number to the second number in the expression
            expression.second_number += number;
        }
    }

    // add the number value to the input field to show the
    // number the user just selected
    document.querySelector( "#inputfield" ).value += number;
}

// add operators to our current expression
function addOper( oper ) {
    // we have everything to solve our expression
    if( expression.hasFirst && expression.hasOper ) {
        // check if we have a second number
        if( expression.second_number == "" ) {
            // overwrite the current operator
            expression.operator = oper;
        }

        // if we do solve the expression and save this operator
        else {
            // 
            if( expression.second_number.includes(".") && expression.second_number.length == 2 ) {
                expression.second_number += "0";
            }

            // solve the expression
            solveExpression();
            // add operator for new expression
            expression.operator = oper;
        }
    }
    
    // add the operator or overwrite the operator in the expression
    else {
        // check if the expression first value is an empty string
        if( expression.first_number == "" ) {
            // we have an error
            disableButtons = true;
            //
            document.querySelector( "#inputfield" ).value = "Error";
        }
                
        // set has first to be true 
        else {
            //
            expression.hasFirst = true;
            // check for the case when we have a float like this: "3." -> treat this as zero

            if( expression.first_number.includes(".") && expression.first_number.length == 2 ) {
                expression.first_number += "0";
            }

            //
            expression.hasOper = true;
            // add the operator or overwrite the existing operator
            expression.operator = oper;
        }
    }
}

// evaluate the expression and update history to show the result of our current expression
function solveExpression() {
    let value1 = '';
    let value2 = '';

    // check if we are dealing with a float for the first number or the second number
    if( expression.first_number.includes(".") ) {
        // number 1 is a float
        value1 = parseFloat( expression.first_number );

        // check if number 2 is a float
        if( expression.second_number.includes(".") ) {
            // number 2 is a float
            value2 = parseFloat( expression.second_number );
        }

        // integer
        else {
            value2 = parseInt( expression.second_number );
        }
    }

    // at least the first number isn't a float
    else {
        value1 = parseInt( expression.first_number );

        // check if number 2 is a float
        if( expression.second_number.includes(".") ) {
            // number 2 is a float
            value2 = parseFloat( expression.second_number );
        }

        // integer
        else {
            value2 = parseInt( expression.second_number );
        }
    }
            
    // addition
    if( expression.operator == "+" ) {
        let result;

        result = value1 + value2;

        document.querySelector( "#inputfield" ).value = result;

        // save to result history
        resultsHistory.all_results[ resultsIdx ] = result;

        //
        let li = document.createElement('li');
        //
        li.innerHTML = resultsHistory.all_results[ resultsIdx ];
        //
        li.addEventListener( 'click', (e) => {
            if( disableButtons ) {
                e.preventDefault();
            }

            else {
                // When list item is clicked update the textfield html
                // e.target has information on current list item and innerHTML is the value held
                document.querySelector( "#inputfield" ).value = e.target.innerHTML;

                if( !expression.hasFirst ) {
                    expression.first_number = e.target.innerHTML;
                }

                else {
                    // make sure we have the first number and an operator before modifying the second value
                    if( expression.hasFirst && expression.hasOper ) {
                        expression.second_number = e.target.innerHTML;
                    }
               
                    // otherwise just overwrite the current first_number
                    else {
                        expression.first_number = e.target.innerHTML;
                    }
                }
            }
        });

        //
        document.querySelector( "#historyList" ).appendChild( li );

        // update idx
        resultsIdx++;

        // save the result to the first_number to continue the calculation
        expression.first_number = result.toString();
        //
        expression.hasFirst = true;
        //
        expression.second_number = "";
    }

    // subtraction
    else if( expression.operator == "-" ) {
        let result;

        result = value1 - value2;

        document.querySelector( "#inputfield" ).value = result;

        // save to result history
        resultsHistory.all_results[ resultsIdx ] = result;

        // update list
        let li = document.createElement('li');
        //
        li.innerHTML = resultsHistory.all_results[ resultsIdx ];
        //
        li.addEventListener( 'click', (e) => {
            if( disableButtons ) {
                e.preventDefault();
            }

            else {
                // When list item is clicked update the textfield html
                // e.target has information on current list item and innerHTML is the value held
                document.querySelector( "#inputfield" ).value = e.target.innerHTML;
                //
                if( !expression.hasFirst ) {
                    expression.first_number = e.target.innerHTML;
                }

                else {
                 // make sure we have the first number and an operator before modifying the second value
                    if( expression.hasFirst && expression.hasOper ) {
                        expression.second_number = e.target.innerHTML;
                    }
               
                    // otherwise just overwrite the current first_number
                    else {
                        expression.first_number = e.target.innerHTML;
                    }
                }
            }
        });

        //
        document.querySelector( "#historyList" ).appendChild( li );

        // update resultsIdx
        resultsIdx++;

        // save the result to the first_number to continue the calculation
        expression.first_number = result.toString();
        //
        expression.hasFirst = true;
        //
        expression.second_number = "";
    }

    // multiplication
    else if( expression.operator == "*" ) {
        let result;

        result = value1 * value2;

        document.querySelector( "#inputfield" ).value = result;

        // save to result history
        resultsHistory.all_results[ resultsIdx ] = result;

        let li = document.createElement('li');
        //
        li.innerHTML = resultsHistory.all_results[ resultsIdx ];
        //
        li.addEventListener( 'click', (e) => {
            if( disableButtons ) {
                e.preventDefault();
            }

            else {
                // When list item is clicked update the textfield html
                // e.target has information on current list item and innerHTML is the value held
                document.querySelector( "#inputfield" ).value = e.target.innerHTML;

                if( !expression.hasFirst ) {
                    expression.first_number = e.target.innerHTML;
                }

                else {
                    // make sure we have the first number and an operator before modifying the second value
                    if( expression.hasFirst && expression.hasOper ) {
                         expression.second_number = e.target.innerHTML;
                    }
                
                    // otherwise just overwrite the current first_number
                    else {
                        expression.first_number = e.target.innerHTML;
                    }
                }
            }
        });

        //
        document.querySelector( "#historyList" ).appendChild( li );

        // update idx
        resultsIdx++;

        // save the result to the first_number to continue the calculation
        expression.first_number = result.toString();
        //
        expression.hasFirst = true;
        //
        expression.second_number = "";
    }

    // division
    else {
        if( value1 == 0 || value2 == 0 ) {
            // error message
            document.querySelector( "#inputfield" ).value = "Error";
            // set buttons to be disabled
            disableButtons = true;
        }

        else {
            let result;

            result = ( value1 / value2 ).toPrecision( 8 );

            result = value1 / value2;

            document.querySelector( "#inputfield" ).value = result;
    
            // save to result history
            resultsHistory.all_results[ resultsIdx ] = result;

            // update list
            let li = document.createElement('li');
            //
            li.innerHTML = resultsHistory.all_results[ resultsIdx ];
            //
            li.addEventListener( 'click', (e) => {
                if( disableButtons ) {
                    e.preventDefault();
                }

                else {
                    // When list item is clicked update the textfield html
                    // e.target has information on current list item and innerHTML is the value held
                    document.querySelector( "#inputfield" ).value = e.target.innerHTML;

                    if( !expression.hasFirst ) {
                        expression.first_number = e.target.innerHTML;
                    }
    
                    else {
                        // make sure we have the first number and an operator before modifying the second value
                        if( expression.hasFirst && expression.hasOper ) {
                            expression.second_number = e.target.innerHTML;
                        }

                        // otherwise just overwrite the current first_number
                        else {
                            expression.first_number = e.target.innerHTML;
                        }
                    }
                }
            });

            //
            document.querySelector( "#historyList" ).appendChild( li );

            // update idx
            resultsIdx++;
    
            // save the result to the first_number to continue the calculation
            expression.first_number = result.toString();
            //
            expression.hasFirst = true;
            //
            expression.second_number = "";
        }
    }

    //
    lineReset = false;
}

// this is to help create float values for our expressions and also to prevent the user from trying to type something invalid
// like 4...03, etc. We achieve the correct behavior with these checks and use the addNumber() function to add to our current expression
function check_float( period ) {
    if( !expression.hasFirst && expression.first_number != "" && !expression.first_number.includes(".") ) {
        addNumber( period );
    }

    else if( expression.hasFirst && expression.second_number != "" && !expression.second_number.includes(".") ) {
        addNumber( period );
    }
}

// when the user clicks the flip sign button this function is called to negate our current value in the current expression
function flipSign() {
    let inputBox = document.querySelector( "#inputfield" );
    // check first if the current input string
    // in the input text box has a number in it
    if( inputBox.value.match(/[0-9]/) && !inputBox.value.includes("-")) {
        // then flip the sign
        let string = inputBox.value.slice( 0, 0 ) + "-" + inputBox.value.slice( 0 );

        //
        inputBox.value = string;
        // determine whether we flipped the first or second number in the expression
        // and update the string held by the first or second number in the expression
        if( !expression.hasFirst && expression.first_number != "" && expression.first_number.match(/[0-9]/) ) {
            expression.first_number = string;
        }

        else if( expression.hasFirst && expression.hasOper && expression.second_number == "" ) {
            expression.first_number = string;
        }

        else {
            if( expression.second_number != "" && expression.second_number.match(/[0-9]/)) {
                expression.second_number = string;
            }
        }
    }

    else if( inputBox.value.includes("-") ) {
        let string = inputBox.value.slice( 1 );

        //
        inputBox.value = string;
        // determine whether we flipped the first or second number in the expression
        // and update the string held by the first or second number in the expression
        if( !expression.hasFirst && expression.first_number != "" && expression.first_number.match(/[0-9]/) ) {
            expression.first_number = string;
        }

        else if( expression.hasFirst && expression.hasOper && expression.second_number == "" ) {
            expression.first_number = string;
        }

        else {
            if( expression.second_number != "" && expression.second_number.match(/[0-9]/)) {
                expression.second_number = string;
            }
        }
    }
}

// clear our history of previous expressions that we have typed or "clicked" into this calculator
function clearHistory() {
    resultsHistory = {
        all_results: []
    };

    resultsIdx = 0;

    document.querySelector( "#historyList" ).innerHTML = "";
}

// clear the current expression this includes the input box and all values that we currently held for an expression (value 1, operator, value2)
function clearExpression() {
    expression = {
        hasFirst: false,
        //
        hasOper: false,
        // first number we want to perform an operation on
        first_number: '',
        // operator we will use for the operation
        operator: '',
        // second number we will use to perform an operation
        second_number: ''
    };

    //
    disableButtons = false;
    //
    document.querySelector( "#inputfield" ).value = "";
}

// have a function for checking if letter is a letter
function isValidInput( string ) {
    if( string.match(/[0-9]/) ) {
        return true;
    }

    else if( string == "Backspace" || string == "Enter" || string == "." ) {
        return true;
    }

    else {
        return false;
    }
}
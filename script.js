/*
default logic
1.when event 'onload' happes, 
    a. make div(class label) element - done
    b. using charRange(), foreach label div from a to j as 'letters' -done
    c. using range, make array 'number' from 1 to 99 - done
    d. using foreach at number, make input elements and place between number element - done
    
2.when input changes
    a. if value is number, nothing happens
    b. if value is number + operator + number, change value to result. but you should do * % first
    c. if value is cell (a1, j2) change values to that cell
    d. if value is start from '=' parse, and apply functions
    ... first get value, then change cell reference to numbers(using input id) -> if operator exist do operate
*/


//function range to make array from start to end numbers
//use parseint for later
const range = (start, end) => Array(parseInt(end) - parseInt(start) + 1)
    .fill(parseInt(start))
    .map((el,index) => el + index);

//function charRange to make array from start to end letters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0))
    .map(el => String.fromCharCode(el))


//function make div with class 'label' and append to parent
const makeLabel = (el,parent) => {    
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = el;
        parent.appendChild(label);    
}

//function make input with id 'letter + number" and append to parent, with property 'onchange = update'
const makeInput = (letter, number, parent) => {
    const input = document.createElement("input");
    input.type = "text";
    input.id = letter + number;
    input.ariaLabe = letter + number;
    parent.appendChild(input);
    input.onchange = update;
}

/// function make operation
const operations = {
    "+": (x,y) => x + y,
    "-": (x,y) => x - y,
    "*": (x,y) => x * y,
    "/": (x,y) => x / y,
    "%": (x,y) => x % y
}

// functions for excel functions
// don't use 'this' !!!!
const excelFunctions = {
    "sum": nums => nums.reduce((acc,cur) => acc + cur, 0),
    "average": nums => excelFunctions.sum(nums) / nums.length,
    "isEven": num => num % 2 === 0    
}

//parse functiongs

//parse 1. check colon, if exist, return nums array
const checkColon = text => {
    const colonMatch = /([A-Ja-j])(\d+):([A-Ja-j])(\d+)/;        
    if (text.includes(":")){
        const getLetterNumber = text.match(colonMatch);        
        const letters = charRange(getLetterNumber[1].toUpperCase(),getLetterNumber[3].toUpperCase());
        const numbers = range(getLetterNumber[2],getLetterNumber[4]);
        let result = [];
        for ( let i = 0 ; i < letters.length ; i++){
            for (let j = 0 ; j < numbers.length ; j++){
                result.push(letters[i] + numbers[j]);
            }
        }        
        return result
                .map(el => parseInt(document.getElementById(el).value))
                .filter(el => !isNaN(el));
    }     
    return text;        
}



/*
const parse = (value, reg) => {
    console.log(value)
    const val = value.replace(/\s/ig, "");
    console.log(val);
    const cellToVal = (text) => document.getElementById(text).value;
    val.match(reg)
        .forEach( el => cellToVal(el));
}
*/

//function update to get input value and call parse
const update = (event) => {
    console.log(event.target.id);
    //get input value
    const value = event.target.value.replace(/\s/ig,"");
    console.log(value);
    //regex
    const cellReference = /([A-Ja-j])([0-9])([1-9])?/ig;
    const numberReference = /^(\d)+$/ig;
    const highOperator = /[*\/%]/;
    const lowerOperator = /[+-]/;    
    
    //parse
    //1. check input start with "=" - done
    //2. check ":". if it is, make array - done
    //3. cell number, get input value and replace. 
    //4. if value is null or undefined, leave it
    //5. if all values are replaced, operate using stack
    //6. else leave it

    //check input is function or not
    if ( value[0] === "="){
        let text = value.slice(1)
        text = checkColon(text);        
        console.log(text);
    }    
    
}


window.onload = () => {
    //make container as sheet
    const container = document.getElementById("container");                       
    
    //make div from A -J array and append to container
    const letters = charRange("A", "J");
    letters.forEach((letter) => makeLabel(letter, container));    
    
    //make numbers array
    const numbers = range(1,99);
    numbers.forEach((number) => {
        // using numbers, make 1-99 div.
        // so now structure is <div class = "label">J</div><div class = "label">1</div>...<div class = "label">1</div>
        makeLabel(number, container);
        
        // now you're using numbers.foreEach, after below, structure is
        // <div class = "label">J</div><div class = "label">1</div><input id = a1></input><input id = J1></input><div class = "label">2</div>...
        letters.forEach((letter) => makeInput(letter, number, container));
    })    
}
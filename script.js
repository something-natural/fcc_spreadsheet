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
const range = (start, end) => Array(end - start + 1)
    .fill(start)
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

/*
const sum = nums => nums.reduce((acc,cur) => acc + cur,0);
const average = nums => sum(nums) % nums.length;
const isEven = num => num % 2 === 0;
*/


const parse = (value) => {    

    }


//function update to get input value and call parse
const update = (event) => {
    const value = event.target.value;
    const cellReference = /([A-Ja-j])([0-9])([1-9])?/ig;
    const numberReference = /(\d)+/ig

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
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

/// fourBasicOperations
const fourBasicOperations = {
    "+": (x,y) => x + y,
    "-": (x,y) => x - y,
    "*": (x,y) => x * y,
    "/": (x,y) => x / y    
}

// excel functions. don't use 'this' !!!!
const excelFunctions = {
    sum: nums => nums.reduce((acc,cur) => acc + cur,0),
    average: nums => sum(nums) / nums.length,
    iseven: num => num % 2 === 0,
    firsttwo: nums => nums.sort((a,b) => a - b).slice(0,2),
    lasttwo: nums => nums.sort((a,b) => a - b).slice(-2),
    median: nums => {
        const sorted = nums.sort((a,b) => a - b);    
        return sorted.length % 2 === 0 ? average([sorted[sorted.length / 2 - 1], sorted[sorted.length / 2]]) : sorted[Math.floor(sorted.length / 2)]
    },
    countif: (nums,arg) => nums.filter(el => el === arg).length
}

//parse functions
//parse 1. =sum, =average, =isEven, check colon, if exist, return nums array
/*
const checkColon = args => {
    const colonMatch = /([A-Ja-j])(\d+):([A-Ja-j])(\d+)/;
    if (args.includes(":")){
        

          const getLetterNumber = args.match(colonMatch);        
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
                .filter(el => !isNaN(el))
  
    }     
    return args;        
}
*/

/*
    //regex
    const cellReference = /([A-Ja-j])([0-9])([1-9])?/ig;
    const numberReference = /^(\d)+$/ig;
    const highOperator = /[*\/%]/;
    const lowerOperator = /[+-]/;    


    const checkFunctionText = /^([A-Za-z]+)\((.*)\)$/;
    const alterText = text.match(checkFunctionText)[0];
    if ( text === alterText){
        //if it is function,
        console.log(alterText)
        //check it is using colon
        let args = checkColon(text.match(checkFunctionText)[2]);     
        console.log(args);
        // call functions and replace event.target.value with result
        console.log(excelFunctions[text.match(checkFunctionText)[1]]);
        event.target.value = excelFunctions[text.match(checkFunctionText)[1]](args);
    } 

*/

const parser = (parsingTarget) => {
    // so you are expecting
    // 1. =sum(a1:b2), sum(a1,b2,c3), sum(a1,b2,c3,a2*b2,) countif(a1:a13, a1)
    // 2. =sum(1,2,3,4,5), sum(1,2,3*4,12/2)
    // 3. =1*3-2
    // so if there is no ":", just replace all cell id with its value, handle, */+- then handle excelfunction text
    // if there is ":", get character, nums, and make charcter + nums array, then replace all cell id with its value, handle, */+- then handle excelfunction text
    
    
    //functions


    //functions to replace cell id with ist value. you should return text not array, to handle "=A1+B1" => 1+2
    const getCellValue = id => document.getElementById(id).value;
    const cellIdRegex = /[A-Ja-j][1-9][0-9]?/g;
    const cellToValue = text => text.replace(cellIdRegex, match => getCellValue(match));    
    //return cellToValue(parsingTarget)

    
}

//function update to get input value and call parser
const update = (event) => {
    //get input value
    const inputValue = event.target.value.replace(/\s/g,"");
     //check input is start with "="
    if ( inputValue[0] === "="){                
        let parsingTarget = inputValue.slice(1)        
        //check function or simple operation
        event.target.value = parser(parsingTarget);
    }        
}




// init spreadsheet
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
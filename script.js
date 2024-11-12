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


const parser = (parsingTarget) => {
    // so you are expecting
    // 1. =sum(a1:b2), sum(a1,b2,c3), sum(a1,b2,c3,a2*b2,) countif(a1:a13, a1)
    // 2. =sum(1,2,3,4,5), sum(1,2,3*4,12/2)
    // 3. =1*3-2
    // if there is ":", get character, nums, and make charcter + nums array. in other words, make cell id array from colon. ( a1:c3  => a1, a2, a3, b1, b2, b3, c1, c2, c3)
    // then replace all cell id with its value, handle, */+- 
    // then handle excelfunction text    


    const getCellValue = id => document.getElementById(id).value;
    
    //functions to handle ":"
    const cellRangeRegex = /([A-Ja-j])([1-9][0-9]?):([A-Ja-j])([1-9][0-9]?)/;
    const charNumToInputValue = char1 => char2 => num => charRange(char1, char2).map(el => getCellValue(el + num));    
    const cellRangeToInputValue = text => text.replace(cellRangeRegex, (match, char1, num1, char2, num2) => 
                                                    range(num1, num2).map(num => charNumToInputValue(char1)(char2)(num)))    

    //functions to replace cell id with ist value. you should return text not array, to handle "=A1+B1" => 1+2    
    const cellIdRegex = /[A-Ja-j][1-9][0-9]?/g;
    const cellIdToInputValue = text => text.replace(cellIdRegex, match => getCellValue(match));        

    // let's rock
    const readyToFourOps = cellIdToInputValue(cellRangeToInputValue(parsingTarget))
    // now your "=sum(A1:C3)","=A1,B1,C1:D1, E1+F1" are converted to "=sum(1,2,3,4,5,6,7,8,9)", =1,2,3,4,5+6
    console.log(readyToFourOps);
    //first, hand four basic operations first
    const multiDivRegex = /([\d]\s?)([*\/])([\s]?[\d])/; // don't make global. because you should convert using recursive method    
    const plusMinusRegex =  /([\d]\s?)([+-])([\s]?[\d])/
    const applyFourOps = (text, regex) => text.replace(regex, (match, arg1, ops, arg2) => fourBasicOperations[ops](arg1,arg2) )
    
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

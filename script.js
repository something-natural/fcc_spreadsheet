const range = (start, end) => Array(end - start + 1)
    .fill(start)
    .map((el,index) => el + index);

const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0))
    .map(el => String.fromCharCode(el))


const update = (event) => console.log(event.target.value);

window.onload = () => {
    const container = document.getElementById("container");    
    const createLabel = letter => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = letter;
        container.appendChild(label);
    }
           
    const letters = charRange("A", "J");
    letters.forEach(createLabel);
    
    const numbers = range(1,99);
    numbers.forEach((number) => {
        createLabel(number);
        letters.forEach(letter => {
            const input = document.createElement("input");
            input.type = "text";
            input.id = letter + number;
            input.ariaLabe = letter + number;
            container.appendChild(input);
            input.onchange = update;
        })
    })    
}
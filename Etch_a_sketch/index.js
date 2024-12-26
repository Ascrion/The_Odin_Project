// Initialising variables
let grid_size = 0;
const grid_area = document.querySelector(".grid");
const div = document.querySelector('.grid'); 
const rect = div.getBoundingClientRect();
console.log(`Grid Area Width: ${rect.width}, Grid Area Height: ${rect.height}`);

// Listening on grid-size menu buttons to get their ID
const targetDiv = document.querySelector(".dropdown-content");
const buttons = targetDiv.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    grid_size = Number(button.id);
    console.log(`User selected grid size is ${grid_size}`);

    let height = cell_height(grid_size);
    let width = cell_width(grid_size);
    grid_creator(grid_size, height, width);
    // Disabling grid select after a size is selected
    buttons.forEach((btn) => btn.setAttribute("disabled", true));
    console.log("Grid-select-button disabled");
  });
});

// Cell height and width
function cell_height(grid_size){
    return (rect.height / grid_size);
}
function cell_width(grid_size){
    return (rect.width / grid_size);
}

// Creating the grids using JS
function grid_creator(grid_size, height, width){
    for (let i = 1; i <= grid_size; i++) {
        for (let j = 1; j <= grid_size; j++) {
            let newElement = document.createElement("div");
            newElement.classList.add("grid_element");
            newElement.setAttribute("style", `height:${height}px; width:${width}px; border: 1px solid black;margin:0;background-color: white;`);
            grid_area.appendChild(newElement);
        }
    }
    alert("Select a color to start drawing");
}

// Pen selection
const colors = document.querySelector(".colors");
const pens = colors.querySelectorAll("button");
pens.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(`${button.id} was selected.`);
        // Removing pre-existing color to avoid confusion
        const colors = document.querySelector(".colors");
        const pens = colors.querySelectorAll("button");
        pens.forEach((button) => {
            let color = document.querySelector(`#${button.id}`);
            color.setAttribute("style", "border: 1px black solid");
        });
        // Highlighting selected color for user to notice
        let color = document.querySelector(`#${button.id}`);
        color.setAttribute("style", "border: 3px gray solid");
        // Passing color to drawing function
        drawing(button.id);
    });
});

// Drawing functionality
function drawing(color) {
    const grid = document.querySelector(".grid");
    const cells = grid.querySelectorAll("div");

    let isDrawing = false; // Flag to track if the mouse is pressed
    // Start drawing on mousedown
    grid.addEventListener("mousedown", () => {
        isDrawing = true;
    });
    // Stop drawing on mouseup
    document.addEventListener("mouseup", () => {
        isDrawing = false;
    });
    // Paint cells on mouseover if drawing is active
    cells.forEach((div) => {
        // Paint on click
        div.addEventListener("click", () => {
            div.style.backgroundColor = color;
        });
        // Paint on mouseover while holding the mouse button
        div.addEventListener("mouseover", () => {
            if (isDrawing) {
                div.style.backgroundColor = color;
            }
        });
    });
}

// Reset button
const reset_button = document.querySelector("#reset_button");
reset_button.addEventListener("click", function (){
    console.log("Reset button clicked");
    grid_area.innerHTML = "";
    grid_size = 0;
    // Enabling grid select after resetting
    const targetDiv2 = document.querySelector(".dropdown-content");
    const buttons = targetDiv2.querySelectorAll("button");
    buttons.forEach((btn) => btn.removeAttribute("disabled"));
    console.log("Grid-select-button enabled");
});

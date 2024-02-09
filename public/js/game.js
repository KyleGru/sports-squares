function createFirstRow(questionBoxes) {
    const firstRow = document.createElement('tr');
    for (let i = 0; i < questionBoxes; i++) {
        const cell = document.createElement('td');
        if (i === 0) {
            cell.textContent = '';
        } else{
            cell.textContent = '?';
            cell.classList.add('question-box');
        };
        firstRow.appendChild(cell);
    }
    return firstRow;
}
// Function to create a single row with question mark box followed by "Open" boxes
function createRow(numBoxes) {
    const row = document.createElement("tr");
    for (let i = 0; i < numBoxes; i++) {
        const cell = document.createElement("td");
        if (i === 0) {
            cell.textContent = "?";
            cell.classList.add("question-box");
        } else {
            cell.textContent = "Open";
            cell.classList.add("open-box");
        }
        row.appendChild(cell);
    }
    return row;
}

// Function to create the entire grid
function createGrid(numRows, numBoxesPerRow) {
    const table = document.getElementById("squaresTable");
    table.appendChild(createFirstRow(numBoxesPerRow))
    for (let i = 0; i < numRows; i++) {
        const rows = createRow(numBoxesPerRow);
        table.appendChild(rows);
    }
}

// Call the function to generate the grid with 10 rows and 11 boxes per row
createGrid(10, 11);

function selectOpenBox() {
    const openBoxes = document.querySelectorAll('.open-box');
    openBoxes.forEach((box => {
        box.addEventListener('click', handleClick);

    }))
}

function handleClick(event) {
    event.target.textContent = event.target.textContent === 'Open' ? username.name : 'Open';
}
selectOpenBox();




function startGame() {
    setTimeout(() => {
        document.querySelector('.question-box').forEach(square => {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            square.textContent = randomNumber;
        });
    }, 5000);
}

startGame();
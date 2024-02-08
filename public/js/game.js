function createFirstRow(questionBoxes) {
    const firstRow = document.createElement('tr');
    for (let i = 0; i < questionBoxes; i++) {
        const cell = document.createElement('td');
        if (i === 0) {
            cell.textContent = '';
        } else{
            cell.textContent = '?';
        }
        cell.classList.add('question-box');
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
        } else {
            cell.textContent = "Open";
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
        const row = createRow(numBoxesPerRow);
        table.appendChild(row);
    }
}

// Call the function to generate the grid with 10 rows and 11 boxes per row
createGrid(10, 11);


function getSportApi() {
    var requestUrl = '/api/sportFetch';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log(data);
       console.log('Quarter: ', data.Score.QuarterDescription);
       console.log(data.Score.AwayTeam, 'Score:', data.Score.AwayScore);
       console.log(data.Score.HomeTeam, 'Score:', data.Score.HomeScore);
       renderGameInfo(data)
      });
  }

  getSportApi();

function createFirstRow(questionBoxes) {
    const firstRow = document.createElement('tr');
    for (let i = 0; i < questionBoxes; i++) {
        const cell = document.createElement('td');
        if (i === 0) {
            cell.textContent = 'X';
            cell.classList.add('X-box');
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
    const row = document.createElement('tr');
    for (let i = 0; i < numBoxes; i++) {
        const cell = document.createElement('td');
        cell.textContent = i === 0 ? '?' : 'Open';
        cell.classList.add(i === 0 ? 'question-box' : 'open-box');
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
    event.target.textContent = 'X'
}
selectOpenBox();

function renderGameInfo(data) {
    const homeTeam = document.querySelector(".homeTeam")
    const awayTeam = document.querySelector(".awayTeam")
    const quarter = document.querySelector(".quarter")
    const homeScore = document.querySelector(".homeScore")
    const awayScore = document.querySelector(".awayScore")

    // data.Score.HomeTeam, 'Score:', data.Score.HomeScore

    homeTeam.textContent = `${data.Score.HomeTeam}`
    awayTeam.textContent = `${data.Score.AwayTeam}`
    quarter.textContent = `${data.Score.QuarterDescription}`
    homeScore.textContent = `${data.Score.HomeScore}`
    awayScore.textContent = `${data.Score.AwayScore}`
}


function startGame() {
    setTimeout(() => {
            const questionBox = document.querySelector('.question-box');
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            questionBox.textContent = randomNumber;
        
    }, 5000);
}

startGame();


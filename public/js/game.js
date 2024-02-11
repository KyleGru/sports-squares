
// get game info by game id
function getSportApi() {
    let requestUrl = '/api/sportFetch';
  
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
  getGameList();

function getGameList() {
    let requestUrl = '/api/gamesAvailable';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log('game date: ', data);
       selectGame(data);
      });
}

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
    event.target.textContent = event.target.textContent === 'Open' ? username.name : 'Open';
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

function selectGame(data) {
    const gameChoice = document.querySelector(".gameChoices")
    let choice = document.createElement('li')

    for(var i = 0; i < data.length; i++) {
        choice.textContent = `${data[i].HomeTeam} vs ${data[i].AwayTeam}`
        choice.style.cssText = 'list-style: none;'
        gameChoice.appendChild(choice);
    }
}


function startGame() {
    setTimeout(() => {
        document.querySelector('.question-box').forEach(square => {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            square.textContent = randomNumber;
        });
    }, 5000);
}

startGame();


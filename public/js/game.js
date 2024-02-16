
// get game info by game id
function getSportApi(scoreId) {
    let requestUrl = `/api/sportFetch/${scoreId}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log('info', data);
       console.log('Quarter: ', data.Score.QuarterDescription);
       console.log(data.Score.AwayTeam, 'Score:', data.Score.AwayScore);
       console.log(data.Score.HomeTeam, 'Score:', data.Score.HomeScore);
       renderGameInfo(data)
      });
  }

  function refreshFetch(scoreId) {
    setTimeout(() => {
        console.log('Refresh ID', scoreId);
       getSportApi(scoreId)
    }, 30000)
  }

  function fetchById(scoreId) {
    let requestUrl = `/api/sportFetch`;
    console.log('scoreID', scoreId)
    fetch(requestUrl, {
       method: "POST",
       body: JSON.stringify({ 
        score_id: scoreId 
    }),
       headers: { 'Content-Type': 'application/json' }
    })

    setTimeout( () => {
        getSportApi(scoreId);
    }, 1000)
  }

  function fetchByDate(currentTime) {
    let requestUrl = `/api/gamesAvailable`;
    console.log('Post Time', currentTime)
    fetch(requestUrl, {
       method: "POST",
       body: JSON.stringify({ 
        sportdate: currentTime 
    }),
       headers: { 'Content-Type': 'application/json' }
    })

    setTimeout( () => {
        getGameList(currentTime);
    }, 1000)
  }
  

 
//   getGameList();

function getGameList(currentTime) {
    let requestUrl = `/api/gamesAvailable/${currentTime}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log('Game List: ', data);
       selectGame(data);
      });
}

getCurrentDate();

function getCurrentDate() {
    let requestUrl = `/api/gameDateInfo`;
    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log('date data: ', data);
       let timeData = data.CurrentTime;
       let currentTime = timeData.substr(0, 10)
       console.log('Time Formated: ', currentTime)
       fetchByDate(currentTime);
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
        if (i === 0) {
            cell.textContent = '?';
            cell.classList.add('question-box');
        } else {
            cell.textContent = 'Open';
            cell.classList.add('open-box');
        }
        row.appendChild(cell);
    }
    return row;
}

// Function to create the entire grid
function createGrid(numRows, numBoxesPerRow) {
    const table = document.getElementById("squaresTable");
    table.innerHTML = '';
    const firstRow = createFirstRow(numBoxesPerRow);
    table.appendChild(firstRow);
    for (let i = 0; i < numRows; i++) {
        const row = createRow(numBoxesPerRow);
        table.appendChild(row);
    }
}

// Call the function to generate the grid with 10 rows and 11 boxes per row
createGrid(10, 11);

let changeUserBtn = document.querySelector('.changeUsernameBtn')

function changeUsername() {
let usernameForm = document.querySelector('.changeUsername')
let usernameInput = usernameForm.value;
localStorage.setItem('username', usernameInput)
handleClick(usernameInput)
}

function handleClick(event) {
    let placeUsername = localStorage.getItem('username')
    event.target.textContent = placeUsername
}

function clearSelectedOpenBoxes() {
    const openBoxes = document.querySelectorAll('.open-box.selected');
    openBoxes.forEach((box) => {
        box.classList.remove('selected');
    });
}

function selectOpenBox() {
    const openBoxes = document.querySelectorAll('.open-box');
    openBoxes.forEach((box) => {
        box.addEventListener('click', (event) => {
            const placeUsername = localStorage.getItem('username')
            event.target.textContent = placeUsername
            event.target.classList.toggle('selected')
        });
    });
}

selectOpenBox();

function renderGameInfo(data) {
    const homeTeam = document.querySelector(".homeTeam")
    const awayTeam = document.querySelector(".awayTeam")
    const quarter = document.querySelector(".quarter")
    const homeScore = document.querySelector(".homeScore")
    const awayScore = document.querySelector(".awayScore")
    const gameInfo = document.querySelector('.gameInfo')
    const bigHome = document.querySelector('.bigHomeTeam')
    const bigAway = document.querySelector('.bigAwayTeam')
    const gamePlay = document.querySelector('.gamePlay')
    const Q1 = document.querySelector('.Q1Win')
    const Q2 = document.querySelector('.Q2Win')
    const Q3 = document.querySelector('.Q3Win')
    const Q4 = document.querySelector('.Q4Win')

    // data.Score.HomeTeam, 'Score:', data.Score.HomeScore
     if (data.Score.IsInProgress === false) {
        homeTeam.textContent = `${data.Score.HomeTeam}`
    awayTeam.textContent = `${data.Score.AwayTeam}`
    bigHome.textContent = `${data.Score.HomeTeam}`
    bigAway.textContent = `${data.Score.AwayTeam}`
    quarter.textContent =  `TBD`
    homeScore.textContent =  `TBD`
    awayScore.textContent =  `TBD`
    gamePlay.textContent = ` `
     } else {
    homeTeam.textContent = `${data.Score.HomeTeam}`
    awayTeam.textContent = `${data.Score.AwayTeam}`
    quarter.textContent = `${data.Score.QuarterDescription}`
    homeScore.textContent = `${data.Score.HomeScore}`
    awayScore.textContent = `${data.Score.AwayScore}`
    bigHome.textContent = `${data.Score.HomeTeam}`
    bigAway.textContent = `${data.Score.AwayTeam}`
    gamePlay.textContent = `${data.Score.DownAndDistance}`
     }
     

    if (data.Score.HomeTeam === data.Score.Possession) {
        homeTeam.style.cssText = 'color: rgb(24, 143, 24);'
        awayTeam.style.cssText = 'color: black;'
    } else if (data.Score.AwayTeam === data.Score.Possession) {
        awayTeam.style.cssText = 'color: rgb(24, 143, 24);'
        homeTeam.style.cssText = 'color: black;'
    }

    if (data.Score.Has1stQuarterStarted === true) {
        Q1.textContent = `${data.Score.HomeTeam}: ${data.Score.HomeScoreQuarter1}|${data.Score.AwayTeam}: ${data.Score.AwayScoreQuarter1}`
        Q1.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    } else {
        Q1.textContent = 'TBD'
        Q1.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    }

    if (data.Score.Has2ndQuarterStarted === true) {
        Q2.textContent = `${data.Score.HomeTeam}: ${data.Score.HomeScoreQuarter2}|${data.Score.AwayTeam}: ${data.Score.AwayScoreQuarter2}`
        Q2.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    } else {
        Q2.textContent = 'TBD'
        Q2.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    }

    if (data.Score.Has3rdQuarterStarted === true) {
        Q3.textContent = `${data.Score.HomeTeam}: ${data.Score.HomeScoreQuarter3}|${data.Score.AwayTeam}: ${data.Score.AwayScoreQuarter3}`
        Q3.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    } else {
        Q3.textContent = 'TBD'
        Q3.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    }

    if (data.Score.Has4thQuarterStarted === true) {
        Q4.textContent = `${data.Score.HomeTeam}: ${data.Score.HomeScoreQuarter4}|${data.Score.AwayTeam}: ${data.Score.AwayScoreQuarter4}`
        Q4.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    } else {
        Q4.textContent = 'TBD'
        Q4.style.cssText = 'font-size: 8pt; margin-top: 10%; margin-bottom: 5%;'
    }

  gameInfo.style.cssText = 'margin-bottom: 15%; display: flex; justify-content: center; gap: 20%;'

  let scoreId = data.Score.ScoreID
  refreshFetch(scoreId)
}

function selectGame(data) {
    const gameChoice = document.querySelector(".gameChoices")
    gameChoice.classList.add('scoreBtnDiv')
    
     console.log('Select Game', data)
    for(var i = 0; i < data.length; i++) {
        let choice = document.createElement('button')
        choice.textContent += `${data[i].HomeTeam} vs ${data[i].AwayTeam}`
        choice.style.cssText = `list-style: none; margin: 2% ; background-color: rgb(238, 3, 39);
        color: #fff;
        padding: 5px 5px;
        font-size: 16px;
        border: black solid 2px;
        border-radius: 3px;
        cursor: pointer;
        margin-bottom: 10px;
      `
        gameChoice.appendChild(choice);
        localStorage.setItem(`${data[i].HomeTeam}&${data[i].AwayTeam}`, `${data[i].ScoreID}`);
        let keyData = `${data[i].HomeTeam}&${data[i].AwayTeam}`

        choice.onclick = function() {
            gameChoice.classList.add('hide')
            gameChoice.classList.remove('scoreBtnDiv')
            console.log('click', keyData)
            let scoreId = localStorage.getItem(keyData);
             fetchById(scoreId);
             console.log(scoreId)
        }
    }
}


function startGame() {
    const questionBox = document.querySelectorAll('.question-box');
    let i = 0
    const numGenerator = setInterval(() => {
            
            const randomNumber = Math.floor(Math.random() * 9);
            questionBox[i].textContent = randomNumber;
            i++
            if (i > 19) {
                clearInterval (numGenerator);
            }
    }, 50);
}

function clearNumbers() {
    const questionBox = document.querySelectorAll('.question-box');
    questionBox.forEach(box => {
        box.textContent = '?';
    });
}

function clearOpen() {
    const openBox = document.querySelectorAll('.open-box');
    openBox.forEach(box => {
        box.textContent = 'Open';
        box.classList.remove('selected')
    });
}

document.getElementById('clearOpenBtn').addEventListener('click', clearOpen)
document.getElementById('clearBtn').addEventListener('click', clearNumbers);
document.getElementById('startBtn').addEventListener('click', startGame);

changeUserBtn.addEventListener('click', function(event) {
    event.preventDefault();
    changeUsername();
})

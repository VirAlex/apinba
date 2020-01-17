let buttonresult = document.querySelector("#buttonresult")
let buttonother = document.querySelector('#buttonother')
let buttontommorow = document.querySelector('#buttontomorrow')

buttonresult.addEventListener('click', () => {
    console.log("Hello");
    let vTeam = document.querySelector('.vTeam');
    let dTeam = document.querySelector('.dTeam');
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `${proxy}http://data.nba.net/10s/prod/v1/today.json`;
    fetchGameScore();
  document.querySelector('#butres').innerHTML='';
})

buttonother.addEventListener('click', () => {
  document.querySelector('#result').innerHTML = '';
  document.querySelector('#butres').innerHTML = '<a href="#" id="buttonresult"><span>Resultats</span></a>'
})

buttontommorow.addEventListener('click', () => {
  fetchNextMatchs()
})


function fetchGameScore() {
    let vTeam = document.getElementById('result');
    let dTeam = document.querySelector('.dTeam');
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `${proxy}http://data.nba.net/10s/prod/v1/today.json`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const today = data.links.todayScoreboard;
            fetch(`${proxy}http://data.nba.net/10s/${today}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    let output = '';
                    // output += '<ul>';
                    const games = data.games;
                    games.forEach(game => {
                        console.log(game);
                      output += ` <div class="vTeam">
                                  <h2 class="vName">${game.vTeam.triCode}</h2>
                                  <p class="score">${game.vTeam.score}</p>
                                  <h2>VS</h2>
                                  <p class="score">${game.hTeam.score}</p>
                                  <h2 class="dTeam">${game.hTeam.triCode}</h2>
                                </div>
                                <div class="mark">
                                <h4>${game.nugget.text}</h4>
                                </div>
                        `;
                        // const vTeamFind = game.vTeam.triCode;
                        // vTeam.textContent = vTeamFind
                        // dTeam.textContent = game.hTeam.triCode;
                    });
                    output += '</ul>'
                    vTeam.innerHTML = output;
                })
        })
}

function fetchNextMatchs() {
  let vTeam = document.getElementById('result');
  let result = document.querySelector("#result");
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy +  mm + dd;
  console.log(today);

  const api = `${proxy}http://data.nba.net/10s/prod/v2/${today}/scoreboard.json`;
  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      let numGames = data.numGames
      let output = `<div class="titre">
      <h2>Tonight ${numGames} matchs</h2>
      </div>`;
      const games = data.games;
      games.forEach(game => {
        console.log(game);
        output += ` <div class="vTeam">
                      <div class="series">
                      <h2 class="vName">${game.vTeam.triCode}</h2>
                      <p> W ${game.vTeam.win} L ${game.vTeam.loss} </p>
                      <p> actuellement série de ${game.vTeam.seriesWin}  </p>
                      </div>
                      <p class="score">${game.vTeam.score}</p>
                      <h2>VS</h2>
                      <p class="score">${game.hTeam.score}</p>
                      <div class="series">
                      <h2 class="dTeam">${game.hTeam.triCode}</h2>
                      <p> W ${game.hTeam.win} L ${game.hTeam.loss} </p>
                      <p> actuellement série de ${game.hTeam.seriesWin}  </p>
                      </div>
                    </div>
                    <div class="mark">
                      <h4>${game.nugget.text}</h4>
                    </div>
                        `;
        });
      output += '</ul>'
      vTeam.innerHTML = output;
  })
}

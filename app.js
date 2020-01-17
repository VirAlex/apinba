let buttonresult = document.querySelector("#buttonresult")
let buttonother = document.querySelector('#buttonother')
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

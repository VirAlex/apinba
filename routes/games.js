const express = require('express')
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try{
    const todayResponse = await axios.get('http://data.nba.net/10s/prod/v1/today.json')
    const todayScoreboard = todayResponse.data.links.todayScoreboard;

    const gamesResponse = await axios.get(`http://data.nba.net/10s/${todayScoreboard}`)
    const gamesDay = gamesResponse.data.games
    gamesDay.forEach(e => {
      const day = e.vTeam.triCode;
      console.log(day);
      res.json(e.vTeam.triCode)
    });


  }catch (e) {
    console.log(e);
    res.send(400);
  }
});


module.exports = router;

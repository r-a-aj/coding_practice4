const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at https://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const getCricketTeamQuery = `
        SELECT *
        FROM cricket_team
        ORDER BY player_id;
    `;
  const playersArr = await db.all(getCricketTeamQuery);
  response.send(playersArr);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerId, playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO
        movie(player_name,jersey_number,role)
    VALUES
        (${player_name},${jersey_number},${role});`;

  const dbResponse = await db.run(addPlayerQuery);
  response.send("Player Added to Team");
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
        SELECT *
        FROM cricket_team
        WHERE player_id = ${playerId};
    `;
  const player = await db.get(getPlayerQuery);
  response.send(player);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerId, playerName, jerseyNumber, role } = playerDetails;
  const updatePlayerQuery = `
        UPDATE 
            cricket_team
        SET 
            player_id = ${playerId},
            player_name = ${playerName},
            jersey_number = ${jerseyNumber},
            role = ${role}
        WHERE 
            player_id = ${playerId};
    `;
  await db.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

app.delete("/movies/:movieId/",async(request,response)=>{
    const {playerId} = request.params;
    const deletePlayerQuery = `
        DELETE FROM cricket_team
        WHERE player_id = ${playerId};
    `;
    await.db.run(deletePlayerQuery);
    response.send("Player Removed");
});

module.exports = app;

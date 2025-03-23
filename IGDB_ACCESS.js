const { values } = require('lodash');
const fs = require('fs');
const { all } = require('async');
const CLIENT_ID = process.env.CLIENT_ID
const accessToken = process.env.ACCESS_TOKEN;



async function getGames() {
    let offset = 0;
    let allGames = [];
    let stillMoreData = true;

    const API_URL = "https://api.igdb.com/v4/games";

    while (stillMoreData) {
        const query = `fields id, name, platforms, category; where category = 0; limit 500; offset ${offset};`;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Client-ID": CLIENT_ID,
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "text/plain"
                },
                body: query
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const games = await response.json();

            if (games.length > 0) {
                allGames = allGames.concat(games);
                offset += 500;
            } else {
                stillMoreData = false;
            }

            // Avoid hitting rate limits
            await new Promise(r => setTimeout(r, 1000));

        } catch (error) {
            console.error("Error fetching data:", error);
            break;
        }
    }

    // Write to a file
    fs.writeFile("data.json", JSON.stringify(allGames, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("JSON file has been saved!");
        }
    });
}
// Fetch games list
getGames();

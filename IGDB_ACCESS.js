const { values } = require('lodash');
const fs = require('fs');
const { all } = require('async');
const CLIENT_ID = process.env.CLIENT_ID
const accessToken = process.env.ACCESS_TOKEN;

//Grabs all of the platforms within the IGDB Database
async function getPlatform() {

    const API_URL = "https://api.igdb.com/v4/platforms";
    let allPlatforms = []
    let stillMoreData = true;
    let offset = 0;
    while (stillMoreData) {
        const query = `fields id, name; limit 500; offset ${offset};`;

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

            const platforms = await response.json();
            if (platforms.length > 0) {
                allPlatforms = allPlatforms.concat(platforms);
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
    fs.writeFile("./react-app/src/data/platforms.json", JSON.stringify(allPlatforms, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("JSON file platforms has been saved!");
        }
    });

    
}

//Grabs all of the games
async function getGames() {
    let offset = 0;
    let allGames = [];
    let stillMoreData = true;
    

    const API_URL = "https://api.igdb.com/v4/games";

    while (stillMoreData) {
        const query = `fields id, name, platforms, category, age_ratings; where category = 0 & platforms != null & 

        (age_ratings.rating != 9 & age_ratings.rating != 8); limit 500; offset ${offset};`;

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
    fs.writeFile("./react-app/src/data/data.json", JSON.stringify(allGames, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("JSON file data has been saved!");
        }
    });
}
// Fetch games list
getGames();
getPlatform();
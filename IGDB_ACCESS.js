CLIENT_ID = 'uydjma3hg6f130ucg3i3351pc0y90u'
const accessToken = '8pkhyrmxxzsrmjyfyxo8ui0bi7t0os';

async function getGames() {
    let offset = 0
    let allGames = []
    let stillMoreData = true
    let count = 0

    const API_URL = "https://api.igdb.com/v4/games";

    const query = "fields id, name, platforms; limit 500;";
    while (stillMoreData){
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Client-ID": CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "text/plain"
        },
        body: query
    });

    const games = await response.json();
    
    if (games.length > 0){
        count += 1
        
        games.forEach(game => {
            if (String(game.platforms).split(',').includes('6'))
                allGames.push([game.name, game.id])
            
        });
        allGames = allGames.concat(games);
        offset += 500;
    } else {
        stillMoreData = false   
    }
    
    
}
console.log(allGames)
}

// Fetch games list
getGames();
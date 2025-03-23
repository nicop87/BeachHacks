import SteamAPI from 'steamapi';

const steamKey = process.env.steamKey;

//Set up steam api
const steam = new SteamAPI(steamKey);

const steamProfile = "https://steamcommunity.com/id/ColdBoiDoesABrr/"; //Grab user input some other time

//Grab steam id
const steamID = await steam.resolve(steamProfile);

//Grab owned games
const ownedGames = await steam.getUserOwnedGames(steamID, { includeAppInfo: true });
console.log(ownedGames)
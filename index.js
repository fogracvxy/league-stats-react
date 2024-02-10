import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get("/api/summoner/:region/:summonerName/:tagLine", async (req, res) => {
  const { region } = req.params;
  // URL encode the summonerName and tagLine to ensure the URL is correctly formed
  const summonerName = encodeURIComponent(req.params.summonerName);
  const tagLine = encodeURIComponent(req.params.tagLine);
  const apiKey = process.env.RIOT_API_KEY;
  let regionPUUID = region;
  if (region === "na1") {
    regionPUUID = "americas";
  } else if (region === "euw1" || region === "eun1") {
    regionPUUID = "europe";
  }

  let regionalFetchUrl = `https://${regionPUUID}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${apiKey}`;

  try {
    // Fetch the PUUID from the first API
    console.log(regionalFetchUrl);
    const responsePUUID = await fetch(regionalFetchUrl);
    if (!responsePUUID.ok)
      throw new Error("Failed to fetch PUUID from Riot API");
    const dataPUUID = await responsePUUID.json();
    const PUUID = dataPUUID.puuid;

    // Use the PUUID to make a second API call
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID}?api_key=${apiKey}`;
    const responseSummoner = await fetch(url);
    if (!responseSummoner.ok)
      throw new Error("Failed to fetch summoner data from Riot API");
    const dataSummoner = await responseSummoner.json();
    res.json(dataSummoner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching summoner data", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

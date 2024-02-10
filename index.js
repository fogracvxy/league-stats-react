import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get("/api/summoner/:region/:summonerName", async (req, res) => {
  const { region, summonerName } = req.params;
  const apiKey = process.env.RIOT_API_KEY;
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from Riot API");
    const data = await response.json();
    res.json(data);
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

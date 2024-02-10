import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Summoner } from "./components/Summoner";

function App() {
  const [region, setRegion] = useState("");
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const fetchSummonerData = async () => {
    if (!region || !summonerName) return;
    console.log("TEST");
    const displayName = encodeURIComponent(summonerName.split("#")[0]);
    const tagLine = encodeURIComponent(summonerName.split("#")[1] || "");
    const backendUrl = `http://localhost:3001/api/summoner/${region}/${displayName}/${tagLine}`;

    try {
      const response = await fetch(backendUrl);
      const data = await response.json();
      setSummonerData(data);
    } catch (error) {
      console.error("Failed to fetch summoner data:", error);
    }
  };

  return (
    <>
      <NavBar
        setRegion={setRegion}
        setSummonerName={setSummonerName}
        summonerName={summonerName}
        fetchSummonerData={fetchSummonerData}
      />
      <Summoner summonerData={summonerData} />
    </>
  );
}

export default App;

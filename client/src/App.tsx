import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Summoner } from "./components/Summoner";

function App() {
  const [regionFetch, setRegionFetch] = useState("");
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const fetchSummonerData = async () => {
    // Use the state values for region and summonerName in your request
    if (!regionFetch || !summonerName) return;
    const backendUrl = `${regionFetch}${summonerName}`;

    try {
      const response = await fetch(backendUrl);
      const data = await response.json();
      // Process your data here
      setSummonerData(data);
    } catch (error) {
      console.error("Failed to fetch summoner data:", error);
    }
  };

  return (
    <>
      <NavBar
        setRegionFetch={setRegionFetch}
        setSummonerName={setSummonerName}
        summonerName={summonerName}
        fetchSummonerData={fetchSummonerData} // Pass the function down to NavBar
      />
      <Summoner summonerData={summonerData} />
    </>
  );
}

export default App;

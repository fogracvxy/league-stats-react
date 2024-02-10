import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
interface SummonerProps {
  summonerData: any; // Type this according to the data structure you expect
}

const Summoner: React.FC<SummonerProps> = ({ summonerData }) => {
  console.log(summonerData);
  return (
    <div>
      <Flex direction="row" alignItems="center" justifyContent="center">
        {summonerData ? (
          <Box>
            {" "}
            <h1>Summoner Data</h1>
            {/* Display summoner data here. Adjust according to the actual data structure */}
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${summonerData.profileIconId}.png`}
            ></Image>
            <p>Name: {summonerData.name}</p>
            <p>Level: {summonerData.summonerLevel}</p>
            {/* Add more fields as needed */}
          </Box>
        ) : (
          <Box>
            <div>No summoner data found</div>
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default Summoner;

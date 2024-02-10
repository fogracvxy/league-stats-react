import React, { ChangeEvent } from "react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";

interface NavBarProps {
  setRegionFetch: (url: string) => void;
  setSummonerName: (name: string) => void;
  summonerName: string;
  fetchSummonerData: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  setRegionFetch,
  setSummonerName,
  summonerName,
  fetchSummonerData,
}) => {
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    // Construct the API URL using the selected region and summoner name
    const url = `http://localhost:3001/api/summoner/${region}/${summonerName}`;
    setRegionFetch(url);
  };

  const handleSummonerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.target.value);
  };

  // Function to initiate the search when the search button is clicked
  const handleSearchClick = () => {
    fetchSummonerData();
  };

  return (
    <div>
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Box>
          <Flex>
            <Select placeholder="Select region" onChange={handleRegionChange}>
              <option value="eun1">EUNE</option>
              <option value="euw1">EUW</option>
              <option value="na1">NA</option>
            </Select>
            <Input
              placeholder="Enter summoner name"
              value={summonerName}
              onChange={handleSummonerNameChange}
            />
            <Button onClick={handleSearchClick} ml={2}>
              Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;

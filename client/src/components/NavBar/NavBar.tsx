import React, { ChangeEvent } from "react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";

interface NavBarProps {
  setRegion: (region: string) => void;
  setSummonerName: (name: string) => void;
  summonerName: string;
  fetchSummonerData: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  setRegion,
  setSummonerName,
  summonerName,
  fetchSummonerData,
}) => {
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleSummonerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.target.value);
  };

  // No need to pass event since it's not used
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

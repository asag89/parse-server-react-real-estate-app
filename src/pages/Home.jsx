import Slider from "../components/Slider";
import Category from "../components/Category";
import HouseItems from "../components/HouseItems";
import Spinner from "../components/Spinner";

import Parse from "parse/dist/parse.min.js";
import styled from "styled-components";

import { useState, useEffect } from "react";

const HomeContainer = styled.div`
  width: 100%;
`;

const HomeWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [houses, setHouses] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      const query = new Parse.Query("Houses");
      const houses = await query.find();
      setHouses(houses);
    };

    fetchHouses();

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <HomeContainer>
      {houses && <Slider houses={houses} />}
      <HomeWrapper>
        <Category />
        {houses && <HouseItems houses={houses} />}
      </HomeWrapper>
    </HomeContainer>
  );
};

export default Home;

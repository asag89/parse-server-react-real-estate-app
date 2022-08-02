import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";

import { toast } from "react-toastify";

import HouseItems from "../components/HouseItems";
import Spinner from "../components/Spinner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";

const ForContainer = styled.div`
  width: 100%;
`;

const ForWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const ForWrapperh1 = styled.h1`
  margin: 10px 0 30px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const For = () => {
  const params = useParams();

  console.log(params.forType);
  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        let query = new Parse.Query("Houses");

        query.equalTo("forType", params.forType);
        let queryResults = await query.find();
        setHouses(queryResults);
      } catch (error) {
        toast.error("something went wrong");
        console.log(error.message);
      }
    };
    fetchHouses();
    setLoading(false);
  }, [params.forType]);

  console.log(houses);

  if (loading) {
    return <Spinner />;
  }
  return (
    <ForContainer>
      {houses && <Slider houses={houses} />}
      <ForWrapper>
        {/* regex can be used */}
        <ForWrapperh1>For {params.forType}</ForWrapperh1>
        {houses && <HouseItems houses={houses} />}
      </ForWrapper>
    </ForContainer>
  );
};

export default For;

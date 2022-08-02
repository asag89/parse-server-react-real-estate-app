import styled from "styled-components";
import { toast } from "react-toastify";
import Parse from "parse/dist/parse.min.js";
import HouseItems from "../components/HouseItems";
import Spinner from "../components/Spinner";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";

const TypeContainer = styled.div`
  width: 100%;
`;

const TypeWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const TypeWrapperh1 = styled.h1`
  margin: 10px 0 30px;

  &::first-letter {
    text-transform: uppercase;
  }
`;
const Type = () => {
  const params = useParams();

  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        let query = new Parse.Query("Houses");

        query.equalTo("type", params.typeName);
        let queryResults = await query.find();
        setHouses(queryResults);
      } catch (error) {
        toast.error("something went wrong");
        console.log(error.message);
      }
    };
    fetchHouses();
    setLoading(false);
  }, [params.typeName]);

  console.log(houses);

  if (loading) {
    return <Spinner />;
  }
  return (
    <TypeContainer>
      {houses && <Slider houses={houses} />}
      <TypeWrapper>
        {/* regex can be used */}
        <TypeWrapperh1>{params.typeName}s</TypeWrapperh1>
        {houses && <HouseItems houses={houses} />}
      </TypeWrapper>
    </TypeContainer>
  );
};

export default Type;

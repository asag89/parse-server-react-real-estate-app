import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useAuthStatus } from "../hooks/useAuthStatus";
import styled from "styled-components";
import ProfileHouseItem from "../components/ProfileHouseItem";
import Spinner from "../components/Spinner";

const ProfileContainer = styled.div`
  width: 100%;
  height: auto !important;
`;

const ProfileWrapper = styled.div`
  padding: 0 25px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: center !important;
  @media screen and (max-width: 992px) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Profileh1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  border-bottom: solid;
`;

const ProfileAds = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const ProfileAdsHeader = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  @media screen and (max-width: 992px) {
    width: 100%;
  }

  h2 {
    font-weight: 500;
    font-size: 1.2rem;
    border-bottom: solid #ad34eb;
  }
`;
const ProfileCreateBtn = styled(Link)`
  padding: 8px 30px;
  background-color: #ad34eb;
  color: #fff;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const ProfileCurrentAds = styled.div`
  width: 100%;
  height: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHouseEmpthy = styled.div`
  margin: 60px;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  a{
    margin-top: 20px;
    font-weight: 700;
    font-size: 1.4rem;
    color: #ad34eb;
    text-decoration: underline;
}
`

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, loggedIn, checkingStatus } = useAuthStatus();

  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserHouses = async () => {
      try {
        let query = new Parse.Query("Houses");

        query.contains("createdBy", currentUser?.id);
        let queryResults = await query.find();
        setHouses(queryResults);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserHouses();
    setLoading(false);
  }, [currentUser?.id]);


  const onDelete = async (houseId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const House = new Parse.Object("Houses")
      House.set('objectId', houseId);
      try {
        await House.destroy()
        setHouses(houses.filter((house) => {
          return house.id !== houseId
        }))
      } catch (error) {
        console.log(error);
      }
    }
  }

  const onEdit = (houseId) => navigate(`/edit/${houseId}`)

  if (loading) {
    return <Spinner />
  }
  return (
    <ProfileContainer>
      <ProfileWrapper>
        <Profileh1>Profile</Profileh1>
        <ProfileAds>
          <ProfileAdsHeader>
            <h2>Your Ads</h2>
            <ProfileCreateBtn to={"/create-ad"}>
              Sell or rent your home
            </ProfileCreateBtn>
          </ProfileAdsHeader>
          <ProfileCurrentAds>
            {!loading && houses?.length > 0 ? (
              <>
                {houses.map((house) => (
                  <ProfileHouseItem
                    key={house.id}
                    house={house.attributes}
                    id={house.id}
                    onDelete={() => onDelete(house.id)}
                    onEdit={() => onEdit(house.id)}
                  />
                ))}
              </>
            ) : <ProfileHouseEmpthy>
              <h2>There are no house listings</h2>
              <Link to={"/create-ad"}>Create a new one</Link>
            </ProfileHouseEmpthy>
            }
          </ProfileCurrentAds>
        </ProfileAds>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default Profile;

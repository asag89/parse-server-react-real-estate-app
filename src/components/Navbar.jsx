import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";

import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Nav = styled.nav`
  height: 80px;
  background-color: ${({ active, location }) =>
    location === ("/create-ad" || "/profile") || location.startsWith("/edit")
      ? "#ad34eb"
      : location !== ("/profile" || "/create-ad") && !active
        ? "transparent"
        : "#ad34eb"};
  transition: 0.2s ease-in;
  display: ${({ location }) =>
    location === "/sign-in" || location === "/sign-up" ? "none" : "flex"};
  justify-content: space-between;
  padding: 1.4rem;
  z-index: 100000;
  top: 0;
  left: 0;
  position: fixed;
  width: 100% !important;
  overflow: hidden;
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled(Link)`
  margin-right: 40px;
  color: #fff;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  color: #fff;
  display: none;
  font-size: 1.4rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ isOpen, toggle }) => {
  const location = useLocation().pathname;
  const params = useParams();
  const navigate = useNavigate()
  const [navbar, setNavbar] = useState(false);
  const { checkingStatus, loggedIn } = useAuthStatus();

  const changeBackground = () => {
    if (window.scrollY >= 520) { // js observer
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
  }, [loggedIn])

  window.addEventListener("scroll", changeBackground);

  const logOut = async () => {
    try {
      await Parse.User.logOut()
      navigate("/sign-in")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Nav active={navbar} location={location} params={params}>
      <Logo to={"/"} onClick={isOpen && toggle}>
        Ankrom
      </Logo>
      <MenuItems>
        <MenuItem to={"/"}>About</MenuItem>
        <MenuItem to={"/profile"}>
          {loggedIn ? "Profile" : "Explore"}
        </MenuItem>

        <MenuItem to={"/sign-in"} onClick={logOut}>
          {(!checkingStatus && loggedIn) ? "LogOut" : "Sign In"}
        </MenuItem>

        <MenuIcon onClick={toggle}>
          <FaBars />
        </MenuIcon>
      </MenuItems>
    </Nav>
  );
};

export default Navbar;

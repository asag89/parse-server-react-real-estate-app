import visibilityIcon from "../assets/svg/visibilityIcon.svg";

import { toast } from "react-toastify";
import styled from "styled-components";

import Parse from "parse/dist/parse.min.js";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/real-estate-app-1eca0.appspot.com/o/images%2Fsx5wb1Ae3NRvLzkDtYtUW5Fl9yR2-signIn.jpg-cca3ad7c-1fdf-4f1f-9a54-7d70cc97d51c?alt=media&token=bb2db42e-9239-4374-a42f-8e582141c637");
  background-size: cover;
  background-position: center;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SignUpForm = styled.form`
  width: 360px;
  height: 520px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SignUpHeader = styled.header`
  margin: 60px 0 10px;
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;

const SignUpInputGrp = styled.div`
  width: 100%;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 100%;
    border: 0.5px solid #ad34eb;
    font-size: 1rem;
    padding: 10px 15px;
    border-radius: 20px;
  }
`;

const SingUpPasswordWrapper = styled.div`
  width: 100%;
  font-size: 1rem;

  border-radius: 20px;
  position: relative;

  input {
    position: relative;
  }
`;

const SingUpVisibilityImg = styled.img`
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 4px;
  padding: 0.5rem;
`;

const SignUpButton = styled.button`
  width: 100%;
  background-color: #ad34eb;
  color: #fff;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
`;

const ForgetPassword = styled(Link)`
  width: 100%;
  font-size: 0.9rem;
  text-align: center;
`;

const RedirectSignIn = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;

const SignUpBackIcon = styled(Link)`
  position: absolute;
  font-size: 2rem;
  top: 15px;
  right: 25px;
  font-family: 900;
`;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdUser = await Parse.User.signUp(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Bad User Credentials");
      console.log(error.message);
    }
    setLoading(false);
  };
  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <SignUpHeader>Sign Up</SignUpHeader>

        <SignUpInputGrp>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SignUpInputGrp>

        <SignUpInputGrp>
          <SingUpPasswordWrapper className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <SingUpVisibilityImg
              src={visibilityIcon}
              alt="show password"
              title="Show"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </SingUpPasswordWrapper>
        </SignUpInputGrp>

        <SignUpInputGrp>
          <SignUpButton>{loading ? "loading..." : "Sign Up"}</SignUpButton>
        </SignUpInputGrp>

        {/* <OAuth /> */}

        <SignUpInputGrp>
          <ForgetPassword to={"/"}>
            Did you forget your password?
          </ForgetPassword>
        </SignUpInputGrp>

        <SignUpInputGrp>
          <RedirectSignIn to={"/sign-in"}>Sign In Instead</RedirectSignIn>
        </SignUpInputGrp>
      </SignUpForm>
      <SignUpBackIcon to={"/"}>x</SignUpBackIcon>
    </SignUpContainer>
  );
};

export default SignUp;

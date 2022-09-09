import { NextPage } from "next";
import OAuth from "../components/OAuth";
import { authService, firebaseInstance } from "../src/fBase";

const Auth: NextPage = () => {
  return (
    <>
      <div>
        <OAuth />
      </div>
    </>
  );
};

export default Auth;

import { NextPage } from "next";
import OAuth from "../components/OAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

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

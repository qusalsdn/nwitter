import { NextPage } from "next";
import { authService, firebaseInstance } from "../src/fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const OAuth: NextPage = () => {
  const onSocialClick = async (event: any) => {
    const {
      target: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <div className="authContainer">
        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
        <div className="authBtns">
          <button name="google" onClick={onSocialClick} className="authBtn">
            Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button name="github" onClick={onSocialClick} className="authBtn">
            Continue with Github <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
      </div>
    </>
  );
};

export default OAuth;

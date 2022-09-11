import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { authService } from "../src/fBase";
import Home from "../pages/index";
import Auth from "../pages/Auth";
import NavBar from "./NavBar";
import Profile from "../pages/Profile";

interface props {
  children: ReactElement;
}

const Layout: NextPage<props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);
  const router = useRouter();
  const pathName = router.pathname;

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args: any) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
    });
  }, []);

  const refreshUser = () => {
    const user: any = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args: object) => user.updateProfile(args),
    });
  };

  const pathSelection = () => {
    if (pathName === "/") {
      return <Home userObj={userObj} />;
    } else if (pathName === "/Profile") {
      return <Profile refreshUser={refreshUser} userObj={userObj} />;
    }
  };

  return (
    <>
      {isLoggedIn && <NavBar userObj={userObj} />}
      {isLoggedIn ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pathSelection()}
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Layout;

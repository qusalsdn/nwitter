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
  const [init, setInit] = useState(false);
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
        setInit(true);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
        setInit(true);
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

  if (!init) {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "50px" }}>Loading...😜</h1>
      </div>
    );
  }

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

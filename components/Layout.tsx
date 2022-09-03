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
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const pathSelection = () => {
    if (pathName === "/") {
      return <Home userObj={userObj} />;
    } else if (pathName === "/Profile") {
      return <Profile />;
    }
  };

  return (
    <>
      {isLoggedIn && <NavBar />}
      {isLoggedIn ? pathSelection() : <Auth />}
    </>
  );
};

export default Layout;

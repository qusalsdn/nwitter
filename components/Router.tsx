import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const AppRouter: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <>{isLoggedIn ? <Link href={"/"}>Home</Link> : <Link href={"/Auth"}>Auth</Link>}</>;
};

export default AppRouter;

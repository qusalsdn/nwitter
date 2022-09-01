import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

interface props {
  children: ReactElement;
}

const Layout: NextPage<props> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/Auth");
  //   } else {
  //     router.push("/");
  //   }
  // });
  if (!session) {
    router.push("/Auth");
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;

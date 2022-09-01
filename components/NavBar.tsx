import { NextPage } from "next";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const NavBar: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={"/Profile"}>
            <a>My Profile</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

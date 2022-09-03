import { NextPage } from "next";
import Link from "next/link";

const NavBar: NextPage = () => {
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

import { NextPage } from "next";
import Link from "next/link";

interface propsType {
  userObj: any;
}

const NavBar: NextPage<propsType> = ({ userObj }) => {
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
            <a>{userObj.displayName}의 Profile</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

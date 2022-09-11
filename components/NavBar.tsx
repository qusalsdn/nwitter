import { NextPage } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface propsType {
  userObj: any;
}

const NavBar: NextPage<propsType> = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li style={{ marginRight: 10 }}>
          <Link href={"/"} style={{ marginRight: 100 }}>
            <a>
              <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/Profile"}>
            <a
              style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 13,
              }}
            >
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
              <span style={{ marginTop: 10 }}>
                {userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"}
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

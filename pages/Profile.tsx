import { NextPage } from "next";
import { useRouter } from "next/router";
import { authService } from "../src/fBase";

const Profile: NextPage = () => {
  const router = useRouter();

  const onLogOutClick = () => {
    authService.signOut();
    router.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};

export default Profile;

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService, dbService } from "../src/fBase";

interface propsType {
  userObj: any;
  refreshUser: Function;
}

const Profile: NextPage<propsType> = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const router = useRouter();

  useEffect(() => {
    getMyNweets();
  }, []);

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  const onLogOutClick = () => {
    authService.signOut();
    router.push("/");
  };

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};

export default Profile;

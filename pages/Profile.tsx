import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { authService, dbService, storageService } from "../src/fBase";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

interface propsType {
  userObj: any;
}

const Profile: NextPage<propsType> = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const router = useRouter();
  const fileInput: any = useRef();

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

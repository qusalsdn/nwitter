import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authService, dbService } from "../src/fBase";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";

interface userObj {
  userObj: any;
}

const Profile: NextPage<userObj> = ({ userObj }) => {
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
    // const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
  };

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

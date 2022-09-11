import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../src/fBase";
import NweetFactory from "../components/NweetFactory";

interface propsType {
  userObj: any;
}

const Home: NextPage<propsType> = ({ userObj }) => {
  const [nweets, setNweets] = useState<any[]>([]);

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createAt", "desc")
      // onSnapshot은 listner이다. 데이터베이스의 변화를 실시간으로 알려준다.
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNweets(nweetArray);
      });
  }, []);

  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     // useState에 값을 전달할 때 함수를 전달하면 리액트는 이전 값에 접근할 수 있다.
  //     setNweets((prev) => [nweetObject, ...prev]);
  //     // 위의 문법은 nweetObject를 배열 첫 번째에 배치하고 나머지 모든 prev는 뒤에 붙힌다.
  //   });
  // };

  return (
    <>
      <div className="container">
        <NweetFactory userObj={userObj} />
      </div>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => {
          return <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />;
        })}
      </div>
    </>
  );
};

export default Home;

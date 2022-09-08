import type { NextPage } from "next";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../src/fBase";
import { v4 as uuidv4 } from "uuid";

interface propsType {
  userObj: any;
}

const Home: NextPage<propsType> = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<any[]>([]);
  const [attachment, setAttachment] = useState("");
  const fileInput: any = useRef();

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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    fileInput.current.value = "";
    setNweet("");
    setAttachment("");
  };

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => {
    setAttachment("");
    fileInput.current.value = "";
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="무슨 생각을 하고 있니?"
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
          <input type="submit" value="Nweet" />
          {attachment && (
            <div>
              <Image src={attachment} alt="image" width="100px" height="100px" />
              <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
          )}
        </form>
      </div>
      <div>
        {nweets.map((nweet) => {
          return <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />;
        })}
      </div>
    </>
  );
};

export default Home;

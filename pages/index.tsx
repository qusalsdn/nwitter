import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { dbService } from "../src/fBase";

const Home: NextPage = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<any[]>([]);

  useEffect(() => {
    getNweets();
  }, []);

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      // useState에 값을 전달할 때 함수를 전달하면 리액트는 이전 값에 접근할 수 있다.
      setNweets((prev) => [nweetObject, ...prev]);
      // 위의 문법은 nweetObject를 배열 첫 번째에 배치하고 나머지 모든 prev는 뒤에 붙힌다.
    });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
    });
    setNweet("");
  };

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input value={nweet} onChange={onChange} type="text" placeholder="무슨 생각을 하고 있니?" maxLength={120} />
          <input type="submit" value="Nweet" />
        </form>
      </div>
      <div>
        {nweets.map((nweet) => {
          return (
            <>
              <div key={nweet.id}>
                <h4>{nweet.text}</h4>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;

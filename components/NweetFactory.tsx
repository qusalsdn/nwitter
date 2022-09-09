import { dbService, storageService } from "../src/fBase";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

interface propsType {
  userObj: any;
}

const NweetFactory: NextPage<propsType> = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput: any = useRef();

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
    </>
  );
};

export default NweetFactory;

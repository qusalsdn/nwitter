import { dbService, storageService } from "../src/fBase";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface propsType {
  userObj: any;
}

const NweetFactory: NextPage<propsType> = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput: any = useRef();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (nweet === "") {
      return;
    }
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
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="무슨 생각을 하고 있니?"
            maxLength={120}
            className="factoryInput__input"
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          {" "}
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
          id="attach-file"
          style={{ opacity: 0 }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img src={attachment} alt="image" style={{ backgroundImage: attachment }} />
            <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default NweetFactory;

import React from 'react';

import './style.scss';
import default_img from '../../../assets/img/avatar.svg';

const Message = ({ item, curHandle }) => {
  const isOwner = (item.userHandle === curHandle)
  console.log(item);
  return(
    <div className={"message-container" + (isOwner ? " isOwner" : "")}>
      <img
        className={"userImg" + (isOwner ? " isOwner" : "")}
        src={item.avatar ? item.avatar : default_img}
        alt="avatar"
      />
      <div className={"message-sender" + (isOwner ? " isOwner" : "")}>
        <b> <i>{item.userHandle} </i></b>
      </div>
      <div className="message-content">
        <p> {item.content} </p>
      </div>
    </div>
  )
}

export default Message

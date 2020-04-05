import React from 'react';

import './style.scss';
import avatar_pomo from '../../../assets/img/avatar-pomo.png';

const Message = ({ item, curHandle }) => {
  const isOwner = (item.userHandle === curHandle)
  return(
    <div className={"message-container" + (isOwner ? " isOwner" : "")}>
      <img
        className={"userImg" + (isOwner ? " isOwner" : "")}
        src={item.avatar ? item.avatar : avatar_pomo}
        alt="avatar"
      />
      <div className={"message-sender" + (isOwner ? " isOwner" : "")}>
        <b> <i>{item.nickName} </i></b>
      </div>
      <div className="message-content">
        <p> {item.content} </p>
      </div>
    </div>
  )
}

export default Message

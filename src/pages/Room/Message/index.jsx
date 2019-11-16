import React from 'react';

import './style.scss';
import avatar from '../../../assets/img/default_avatar.jpg';

const Message = ({ item, curHandle }) => {
  console.log(curHandle);
  const isOwner = (item.userHandle === curHandle)
  return(
    <div>
      <img className={"userImg" + (isOwner ? " isOwner" : "")} src={avatar} alt="avatar" />
      <div className={"message-container" + (isOwner ? " isOwner" : "")}>
        <div className="message-wrap">
          <div className="message-sender">
            <b> <i>{item.userHandle} </i></b>
          </div>
          <div className="message-content">
            <p> {item.content} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message

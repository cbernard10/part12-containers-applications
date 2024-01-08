import React from "react";
import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }


  return (
    <div className={notification.type} id="notificationBox">
      {notification.message}
    </div>
  );
}

export default Notification;

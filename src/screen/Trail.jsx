import React from 'react';
import Notification from './Notification';
import Demo from './Demo';

const Trail = () => {
  const notifications = [
    { head: "dealer 1", title: "comment", message: "your order" },
    { head: "dealer 2", title: "comment", message: "your order" },
    { head: "dealer 3", title: "comment", message: "your order" },
  ];

  return (
    <div>
      <Demo notificationCount={notifications.length} />
      <Notification />
    </div>
  );
};

export default Trail;

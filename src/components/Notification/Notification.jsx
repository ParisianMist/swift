import './Notification.scss';

//tools
import { useState } from 'react';

//components
import NotificationList from '../NotificationList/NotificationList';

//icons
import moreIcon from '../../assets/icons/expand-more-icon.svg';
import lessIcon from '../../assets/icons/expand-less-icon.svg';

const Notification = ({ swapNotification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="profile__noti">
      <h2 className="profile__noti-title">
        Notifications
        <button className="noti__toggle" onClick={toggleExpansion}>
          <img className="noti__toggle-icon" src={isExpanded ? lessIcon : moreIcon} alt="Toggle Notifications" />
        </button>
      </h2>
      {isExpanded && (
        <div className="profile__noti-list">
          <p className="profile__noti-text">
            The following shifts have been taken
          </p>
          {swapNotification.map((shift) => {
            return (
              <NotificationList
                key={shift.shiftID}
                title={shift.title}
                date={shift.start}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;

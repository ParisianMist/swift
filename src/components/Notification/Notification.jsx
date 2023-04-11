import NotificationList from '../NotificationList/NotificationList';
import './Notification.scss';

const Notification = ({ swapNotification }) => {

    return (
        <>
            <div className="profile__noti">
                <h2 className="profile__noti-title">
                    Notifications
                </h2>
                <div className="profile__noti-list">
                    <p className="profile__noti-text">
                        The following shifts have been taken
                    </p>
                    {swapNotification.map(shift => {
                        return (
                            <NotificationList
                                key={shift.shiftID}
                                title={shift.title}
                                date={shift.start}
                            />
                        )
                    })}
                </div>
            </div>
           
        </>
    );
};

export default Notification;
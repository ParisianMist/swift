
const NotificationList = ({ title, date }) => {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    return (
        <section className='noti'>
            <div className="noti__shifts">
                <p className="noti__message">
                    - {title} on {formattedDate}
                </p>
            </div>
        </section>
    );
};

export default NotificationList;
//styles
import './Profile.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//tools
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from '../../utils/utils';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal'


const localizer = momentLocalizer(moment);



//shift pop-up
const handleClickEvent = (event) => {
  console.log('Event clicked:', event);
};

const Profile = ({ setIsUserLoggedIn }) => {

  const [shift, setShift] = useState()
  const [employeeName, setEmployeeName] = useState()
  const [selectedEvent, setSelectedEvent] = useState(null);

  // load employee's profile
  const token = sessionStorage.getItem("token");

  //log out and return to login
  const logOut = () => {
    sessionStorage.removeItem("token");
    setIsUserLoggedIn(false);
  };

  //if no token log out and return to login
  if (!token) {
    logOut();
  }

  // get all 0 for this employee
  useEffect(() => {
    axios
      .get(`${API_URL}/employee/schedule`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        const data = res.data
       console.log(data)
        setShift(data);
        setEmployeeName(data[0].employeeName)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token]);

  return (
    <main>
      
      <Header
        name={employeeName}
      />

      <section className="profile">
        <h1 className="profile__title">
          Your Schedule
        </h1>
        
        {/* display modal when shift is clicked */}
        {selectedEvent && (
          <Modal
            shift={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />)
        }
        
        <Calendar
          localizer={localizer}
          defaultDate={'2023-04-02'}
          defaultView="month"
          events={shift}
          style={{ height: "85vh" }}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />
     
      </section>
      <Footer />
    </main>
  );
};

export default Profile;
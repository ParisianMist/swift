//styles
import './Profile.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//tools
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { API_URL } from '../../utils/utils';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalPostShift from '../../components/ModalPostShift/ModalPostShift'
import ModalAcceptShift from '../../components/ModalAcceptShift/ModalAcceptShift';

//to render datetime with Calendar
const localizer = momentLocalizer(moment);


const Profile = ({ setIsUserLoggedIn }) => {

  const [shift, setShift] = useState([])
  const [employeeName, setEmployeeName] = useState()
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upForGrabs, setUpForGrabs] = useState([])
  const [employeeID, setEmployeeID] = useState()
  const [swapStatus, setSwapStatus] = useState(false);

  // Check if user is logged in, log out and return to login page if not
  const token = sessionStorage.getItem("token");
  const logOut = () => {
    sessionStorage.removeItem("token");
    setIsUserLoggedIn(false);
  };
  if (!token) {
    logOut();
  }

  // get all shifts for this employee
  const dataRef = useRef(null); //reference to data so it can be used in dependency
  useEffect(() => {
    axios
      .get(`${API_URL}/employee/schedule`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        const data = res.data.map((shift) => ({
          ...shift,
          start: moment(shift.start).toDate(),
          end: moment(shift.end).toDate(),
        }));
        dataRef.current = data;
        if (swapStatus === false) {
          setShift(data);
          setEmployeeName(data[0].employeeName);
          setEmployeeID(data[0].employeeID);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, swapStatus]);


  // Get available shifts for swapping
  useEffect(() => {
    axios.get(`${API_URL}/shift/swap`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          console.log("No available shifts for swapping");
          return;
        }
        const modifiedData = data.map(event => ({
          ...event,
          title: "up for grabs: " + event.title
        }));
        setUpForGrabs(modifiedData);
        setSwapStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);


  // decide which modal to render
  const renderModal = (event) => {
    if (event.employeeID === employeeID) {
      return (
        <ModalPostShift
          shift={event}
          onClose={() => setSelectedEvent(null)}
        />
      );
    } else {
      return (
        <ModalAcceptShift
          shift={event}
          newEmployeeID={employeeID}
          onClose={() => setSelectedEvent(null)}
        />
      );
    }
  };

  return (
    <main>

      <Header
        name={employeeName}
        logout={logOut}
      />

      <section className="profile">
        <h1 className="profile__title">
          Your Schedule
        </h1>

        {/* display modal when shift is clicked */}
        {selectedEvent && renderModal(selectedEvent)}

        <Calendar
          localizer={localizer}
          defaultDate={'2023-04-02'}
          defaultView="month"
          events={[...shift, ...upForGrabs]}
          style={{ height: "85vh" }}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

      </section>
      <Footer />
    </main>
  );
};

export default Profile;

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
import Notification from '../../components/Notification/Notification';
//to render datetime with Calendar
const localizer = momentLocalizer(moment);


const Profile = ({ setIsUserLoggedIn }) => {

  const [shift, setShift] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upForGrabs, setUpForGrabs] = useState([]);
  const [employeeID, setEmployeeID] = useState();
  const [swapStatus, setSwapStatus] = useState(false);
  const [shiftActioned, setShiftActioned] = useState(false);
  const [swapNotification, setSwapNotification] = useState([]);

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
          title: shift.title + (shift.upForGrabs ? ' *' : ''),
          start: moment(shift.start).toDate(),
          end: moment(shift.end).toDate(),
          type: 'regular'
        }));
        dataRef.current = data;
        if (swapStatus === false || dataRef.current.swapStatus === false) {
          setShift(dataRef.current);
          setEmployeeName(dataRef.current[0].employeeName);
          setEmployeeID(dataRef.current[0].employeeID);
        }
        // if (swapStatus===true){
        //   setSwapNotification(dataRef.current)
        // }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, swapStatus, upForGrabs, shiftActioned]);

  // Check if shift taken, remove them from the user's schedule & notify 
  useEffect(() => {
    let takenShift = [];
    if (shift.length > 0) {
      const takenShift = shift.filter((shift) => shift.swapStatus === 1);
      setSwapNotification(takenShift);
    }

    if (takenShift.length > 0) {
      const updatedShifts = shift.filter((shift) => shift.swapStatus === 0);
      setShift(updatedShifts);
    }
  }, [shift, shiftActioned]);

  // Get available shifts for swapping
  useEffect(() => {
    axios.get(`${API_URL}/shift/swap`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.data;
        console.log(data)
        if (data.length === 0) {
          console.log("No available shifts for swapping");
          return;
        }
        const modifiedData = data.map(event => ({
          ...event,
          title: "Available:\n" + event.title,
          type: 'available'
        }));
        setUpForGrabs(modifiedData);
        setSwapStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, upForGrabs, shiftActioned]);

  //add style to different events
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.type === 'available' ? '#f2c6b1' : '#d9e3d8',
      opacity: 0.8,
      color: '#00575d',
      paddingLeft: '.75rem'
    };

    return {
      style: style
    };
  };

  // decide which modal to render
  const renderModal = (event) => {
    console.log(event)
    if (event.employeeID === employeeID) {
      return (
        <ModalPostShift
          shift={event}
          shiftActioned={shiftActioned}
          setShiftActioned={setShiftActioned}
          onClose={() => setSelectedEvent(null)}
        />
      );
    } else {
      return (
        <ModalAcceptShift
          shift={event}
          newEmployeeID={employeeID}
          shiftActioned={shiftActioned}
          setShiftActioned={setShiftActioned}
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
        <div className="profile__top-container">
          <h1 className="profile__title">
            Your Schedule
          </h1>
          <Notification
            swapNotification={swapNotification}
          />
        </div>

        {/* display modal when shift is clicked */}
        {selectedEvent && renderModal(selectedEvent)}

        <Calendar
          localizer={localizer}
          defaultDate={'2023-04-02'}
          defaultView="month"
          events={[...shift.filter(s => !s.swapStatus), ...upForGrabs]}
          style={{ height: "76.75vh" }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          eventPropGetter={eventStyleGetter}
        />

      </section>
      <Footer />
    </main>
  );
};

export default Profile;

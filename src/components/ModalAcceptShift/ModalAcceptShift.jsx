import './ModalAcceptShift.scss';

//tools
import moment from 'moment'
import { useEffect, useState } from 'react';
import axios from "axios";


//API_URL
import { API_URL } from '../../utils/utils';

const ModalAcceptShift = ({ shift, onClose, newEmployeeID }) => {

    const [message, setMessage] = useState('')
    const { title, start, end, shiftID } = shift;
    const [accepted, setAccepted] = useState(false);

    //fix me
    //update original shift, upForGrabs=false and swapStatus=true
    const acceptShift = () => {
        // const updateOriginalShift = {
        //     up_for_grabs: false,
        //     swap_status: true,
        //   };

        axios
            .patch(`${API_URL}/shift/${shiftID}/accept`, { employee_id: newEmployeeID })
            .then(response => {
                console.log('shift accepted', response);
                setTimeout(() => { onClose(); }, 2000);
                setAccepted(true)
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="modal">
            <article className="modal__container">
                <div className="modal__container--overlay">
                    <h2 className="modal__title">
                        Accepted!
                    </h2>
                </div>
                <div className="modal__text-container">
                    <h1 className="modal__title">
                        {title}
                    </h1>

                    <p className="modal__text">
                        start: {moment(start).format('MMM DD, YYYY HH:mm')}
                    </p>
                    <p className="modal__text">
                        end: {moment(end).format('MMM DD, YYYY HH:mm')}
                    </p>
                </div>
                <div className="modal__button-container">
                    <button type="button" className="button button--cancel" onClick={onClose}>
                        Exit
                    </button>
                    <button type="button" className="button button--post-shift"
                        onClick={() => { acceptShift() }} >
                        Take Shift
                    </button>

                </div>
            </article>
        </div>
    );
};

export default ModalAcceptShift;
import './ModalAcceptShift.scss';

//tools
import moment from 'moment'
import { useEffect } from 'react';
import axios from "axios";

//API_URL
import { API_URL } from '../../utils/utils';

//icon
import closeIcon from '../../assets/icons/close_icon.svg'

const ModalAcceptShift = ({ shift, onClose, newEmployeeID, shiftActioned, setShiftActioned }) => {

    const { title, start, end, shiftID } = shift;

    useEffect(() => {
        let timer;
        if (shiftActioned) {
            timer = setTimeout(() => { onClose(); }, 2000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [shiftActioned, onClose]);

    //fix me
    //update original shift, upForGrabs=false and swapStatus=true
    const acceptShift = () => {
        axios
            .patch(`${API_URL}/shift/${shiftID}/accept`, { employee_id: newEmployeeID })
            .then(response => {
                console.log('shift accepted', response);
                setShiftActioned(true)
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="modal">
            <article className="modal__container">
                <div className="modal__icon-container">
                    <img src={closeIcon} alt="close icon" className="modal__icon" onClick={onClose} />
                </div>
                {shiftActioned && (
                    <div className="modal__container--overlay">
                        <h2 className="modal__title">
                            Accepted!
                        </h2>
                    </div>
                )}
                <div className="modal__text-container">
                    <h1 className="modal__title modal__title--available">
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
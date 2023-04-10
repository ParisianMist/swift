import './ModalPostShift.scss';

//tools
import moment from 'moment'
import { useEffect } from 'react';
import axios from "axios";

//API_URL
import { API_URL } from '../../utils/utils';

//icon
import closeIcon from '../../assets/icons/close_icon.svg'

const Modal = ({ shift, onClose, shiftActioned, setShiftActioned }) => {
    const { title, start, end, shiftID, upForGrabs } = shift;

    //update upForGrabs status
    const postShift = () => {
        axios
            .patch(`${API_URL}/shift/${shiftID}`, { up_for_grabs: true })
            .then(response => {
                console.log('shift posted', response);
                setShiftActioned(true);
                setTimeout(() => { 
                    onClose(); 
                }, 2000);
            })
            .catch(err => {
                console.log(`Unable to post shift : ${err}`)
            })
    }
    const removeShift = () => {
        axios
            .patch(`${API_URL}/shift/${shiftID}`, { up_for_grabs: false })
            .then(response => {
                console.log('shift removed', response);
                setShiftActioned(true);
            })
            .catch(err => {
                console.log(`Unable to remove shift : ${err}`)
            })
    }
    useEffect(() => {
        if (shiftActioned) {
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 2000);
        }
    }, [shiftActioned, onClose, upForGrabs]);

    return (
        <div className="modal">
            <article className="modal__container">
                <div className="modal__icon-container">
                    <img src={closeIcon} alt="close icon" className="modal__icon" onClick={onClose}/>
                </div>
                {shiftActioned && (
                    <div className="modal__container--overlay">
                        <h2 className="modal__title">
                            Success!
                        </h2>
                    </div>
                )}
                <div className="modal__text-container">
                    <h1 className="modal__title">
                        {title}
                    </h1>

                    {!!upForGrabs &&
                        <div className="modal__message-container">
                            <p className="modal__message--posted">
                                Shift Posted
                            </p>
                            <button type="button" className="button button--post-shift"
                                onClick={() => {
                                    removeShift()
                                }}>
                                Unpost Shift
                            </button>
                        </div>
                    }

                    <p className="modal__text">
                        Start: {moment(start).format('MMM DD, YYYY HH:mm')}
                    </p>
                    <p className="modal__text">
                        End: {moment(end).format('MMM DD, YYYY HH:mm')}
                    </p>
                </div>
                <div className="modal__button-container">
                    <button type="button" className="button button--post-shift"
                        onClick={() => {
                            postShift()
                        }}
                    >
                        Post Shift
                    </button>

                </div>
            </article>
        </div>
    );
};

export default Modal;
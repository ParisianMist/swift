import './ModalPostShift.scss';

//tools
import moment from 'moment'
import { useEffect, useState } from 'react';
import axios from "axios";


//API_URL
import { API_URL } from '../../utils/utils';



const Modal = ({ shift, onClose }) => {
    const [message, setMessage] = useState('')
    const { title, start, end, shiftID, upForGrabs } = shift;

    //update upForGrabs status
    const postShift = () => {
        axios
            .patch(`${API_URL}/shift/${shiftID}`, { up_for_grabs: true })
            .then(response => {
                console.log('shift posted', response);
                setTimeout(() => { onClose(); }, 2000);
            })
            .catch(err => {
                console.log(`Unable to post shift : ${err}`)
            })
    }
    const removeShift = () => {
        axios
            .patch(`${API_URL}/shift/${shiftID}`, { up_for_grabs: false })
            .then(response => {
                console.log('shift removed', response)
                setMessage('Shift removed');
            })
            .catch(err => {
                console.log(`Unable to remove shift : ${err}`)
            })
    }
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                onClose();
            }, 2000);
        }
    }, [message, onClose, upForGrabs]);

    return (
        <div className="modal">
            <article className="modal__container">
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
                                }}
                            >
                                unPost Shift
                            </button>
                        </div>
                    }

                    <p className="modal__text">
                        start: {moment(start).format('MMM DD, YYYY HH:mm')}
                    </p>
                    <p className="modal__text">
                        end: {moment(end).format('MMM DD, YYYY HH:mm')}
                    </p>
                </div>
                <div className="modal__button-container">
                    <button type="button" className="button button--cancel"
                        onClick={onClose}
                    >
                        Exit
                    </button>
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
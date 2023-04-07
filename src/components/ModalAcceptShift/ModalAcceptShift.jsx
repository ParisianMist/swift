import './ModalAcceptShift.scss';

//tools
import moment from 'moment'
import { useEffect, useState } from 'react';
import axios from "axios";


//API_URL
import { API_URL } from '../../utils/utils';

const ModalAcceptShift = ({ shift, onClose }) => {

    const [message, setMessage] = useState('')
    const { title, start, end, shiftID, upForGrabs } = shift;
    const [accepted, setAccepted] = useState(shift.accepted);

    //update upForGrabs and swapStatus
    const acceptShift=()=>{
        
    };


    return (
        <div className="modal">
            <article className="modal__container">
                <div className="modal__text-container">
                    <h1 className="modal__title">{title}</h1>

                    {accepted ? (
                        <div className="modal__message-container">
                            <p className="modal__message--accepted">Shift Accepted</p>
                            
                        </div>
                    ) : (
                        <div className="modal__message-container">
                            {shift.upForGrabs ? (
                                <>
                                    {/* <p className="modal__message--posted">Shift Posted</p>
                                    <button
                                        type="button"
                                        className="button button--unpost-shift"
                                        onClick={() => {
                                            // removeShift();
                                        }}
                                    >
                                        Unpost Shift
                                    </button> */}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="button button--accept-shift"
                                    // onClick={acceptShift}
                                >
                                    Accept Shift
                                </button>
                            )}
                        </div>
                    )}

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
                        onClick={() => {
                            // postShift()
                        }}
                    >
                        Take Shift
                    </button>

                </div>
            </article>
        </div>
    );
};

export default ModalAcceptShift;
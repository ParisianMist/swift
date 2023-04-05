import './Modal.scss';
import moment from 'moment'

const Modal = ({ shift, onClose }) => {
    console.log(shift)
    const { title, start, end } = shift
    return (
        <div className="modal">
            <article className="modal__container">
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
                    <button type="button" className="button button--cancel"
                        onClick={onClose}
                    >
                        Exit
                    </button>
                    <button type="button" className="button button--post-shift"
                    // onClick={() => {
                    //     postShift()
                    // }}
                    >
                        Post Shift
                    </button>
                </div>
            </article>
        </div>
    );
};

export default Modal;
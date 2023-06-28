import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/features/modal/modalSlice';
import './Modal.css'

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='btn confirm-btn'
            onClick={() => {
              dispatch(closeModal(null));
            }}
          >
            confirm
          </button>
          <button
            type='button'
            className='btn clear-btn'
            onClick={() => {
              dispatch(closeModal(null));
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
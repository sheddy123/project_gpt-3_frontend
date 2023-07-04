

import Button from '@/components/Common/Button/Button';
import './CTA.css'
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/modal/modalSlice';
const CTA = () => {
  const dispatch = useDispatch();
  return (
    <div className="gpt3__cta">
      <div className="gpt3__cta-content">
        <p>Request Early Access to Get Started</p>
        <h3>Register Today & start exploring the endless possibilities.</h3>
      </div>
      <div className="gpt3__cta-btn">
         <Button styles='' text='Get Started' onClick={() => dispatch(openModal(undefined))}/> 
        {/* <button type="button">Get Started</button> */}
      </div>
    </div>
  );
};

export default CTA;

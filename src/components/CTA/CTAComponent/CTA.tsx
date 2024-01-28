

import Button from '@/components/Common/Button/Button';
import './CTA.css'
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/modal/modalSlice';
const CTA = () => {
  const dispatch = useDispatch();
  return (
    <div className="gpt3__cta bg-gradient-to-bl from-gray-300 via-gray-500 to-gray-800 hover:bg-gradient-to-br">
      <div className="gpt3__cta-content ">
        <p>Request Early Access to Get Started</p>
        <h3>Register Today & get ready to experience a new era in insurance to a healthier and more protected life.</h3>
      </div>
      <div className="gpt3__cta-btn">
         <Button styles='' text='Get Started' onClick={() => dispatch(openModal(undefined))}/> 
        {/* <button type="button">Get Started</button> */}
      </div>
    </div>
  );
};

export default CTA;

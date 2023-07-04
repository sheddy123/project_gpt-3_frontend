import possibilityImage from '@/assets/images/manufacturing-hero.png';
import './Possibility.css';
import CodeEditor from '../../Common/CodeEditor/CodeEditor';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      
      <CodeEditor />
    </div>
  </div>
);

export default Possibility;

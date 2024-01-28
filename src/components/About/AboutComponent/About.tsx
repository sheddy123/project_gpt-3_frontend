import Feature from '@/components/Common/Feature/Feature';
import './About.css';

const About = ({planDescription}) => (
  <div className="gpt3__whatgpt3 section__margin bg-gradient-to-bl from-sky-950 to-sky-500" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title={planDescription.title} text={planDescription.text} />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Explore {planDescription.name} Plan</p>
    </div>
    <div className="gpt3__whatgpt3-container">
    {planDescription.features.map((item)=>{
    return   <Feature title={item.title} text={item.text} />
    })}
      
    </div>
  </div>
  
);

export default About;

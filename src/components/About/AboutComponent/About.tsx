import Feature from '@/components/Common/Feature/Feature';
import './About.css';

const About = () => (

  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is Hybrid GPT-3" text="Hybrid GPT-3 represents a groundbreaking fusion of human ingenuity and advanced AI capabilities. By combining the power of OpenAI's GPT-3 language model with human expertise, hybrid GPT-3 programming questions offer a dynamic approach to learning and assessing programming concepts. This innovative blend promises to revolutionize how we teach, learn, and engage with programming challenges." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Learning Outcomes" text="Hybrid GPT-3 questions adapt to diverse learning styles, improving comprehension, retention, and application of complex coding concepts." />
      <Feature title="Programming Quiz" text="Hybrid GPT-3 programming quiz introduces a new dimension to assessing coding proficiency. Through a curated set of questions, participants not only demonstrate technical prowess but also engage in creative problem-solving." />
      <Feature title="Possibilities" text="The possibilities with hybrid GPT-3 programming questions are limitless. As educators and learners, we can now explore coding challenges that reflect real-world scenarios, fostering a deeper understanding of coding principles." />
    </div>
  </div>
);

export default About;

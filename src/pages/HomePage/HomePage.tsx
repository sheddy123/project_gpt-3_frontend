// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import About from "@/components/About/AboutComponent/About";
import CTA from "@/components/CTA/CTAComponent/CTA";
import Footer from "@/components/Footer/FooterComponent/Footer";
import "@/styles/index.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "@/components/Navbar/NavbarComponent/Navbar";
import Header from "@/components/Header/HeaderComponent/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/redux/features/modal/modalSlice";

const HomePage = () => {
  const user = useSelector((store) => store?.authReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const message = location.state && location.state.message;
  const [selectedOption, setSelectedOption] = useState('');
  
  // Function to handle select change
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  
  const renderDescription = () => {
    switch (selectedOption) {
      case 'IndividualHealth':
        return {
          name:"Individual Health",
          title:"What is Individual Health",
          text:"Individual Health Insurance provides coverage for a single person and is tailored to meet the specific medical needs of an individual. It is ideal for those who are not covered by group health insurance plans.",
          features:[
            {
              title:"Personalized Coverage",
              text:"Individual health insurance allows individuals to choose a plan that aligns with their health needs and preferences, ensuring they receive coverage for the services they require."
            },
            {
              title:"Portability",
              text:" Individual health insurance is portable, meaning individuals can carry their coverage with them even if they change jobs or move to a different location."
            },
            {
              title:"Quick Access to Care",
              text:"With individual health insurance, individuals can often access medical care more quickly, enabling them to schedule appointments and procedures without relying on group plan restrictions."
            },
          ]
        };
      case 'FamilyHealth':
        return {
          name:"Family Health",
          title:"What is Family Health",
          text:"Family Health Insurance provides coverage for the medical expenses of the entire family under a single insurance plan. It typically covers the policyholder, their spouse, and dependent children.",
          features:[
            {
              title:"Comprehensive Coverage",
              text:"Family health insurance offers comprehensive coverage for various medical expenses, including hospitalization, doctor visits, surgeries, and preventive care for all family members."
            },
            {
              title:"Cost Savings",
              text:"By bundling coverage for multiple family members under a single plan, family health insurance often provides cost savings compared to purchasing individual policies for each family member."
            },
            {
              title:"Flexibility",
              text:"Family health insurance plans often come with flexibility, allowing families to customize coverage based on their specific needs. This may include the option to add maternity coverage or coverage for specific health conditions."
            },
          ]
        };
      case 'CompanyHealth':
        return {
          name:"Company Health",
          title:"What is Company Health",
          text:"Company Health Insurance, also known as group health insurance, is a policy provided by employers to their employees. It offers health coverage to all eligible employees and may extend to their dependents.",
          features:[
            {
              title:"Group Rates and Cost Sharing",
              text:"Company health insurance often leverages group rates, resulting in lower premium costs for employees. The employer may also share the cost of premiums, making it more affordable for the workforce."
            },
            {
              title:"Comprehensive Coverage",
              text:"Group health insurance typically provides comprehensive coverage, including medical, dental, and sometimes vision benefits. This ensures that employees have access to a broad range of healthcare services."
            },
            {
              title:"Employee Well-being and Productivity",
              text:"Offering health insurance as part of employee benefits contributes to the well-being of the workforce. Healthy employees are more likely to be productive, and access to healthcare can contribute to a positive work environment."
            },
          ]
        };
      default:
        return null;
    }
  };
    useEffect(() => {
      
        function openModalWhenNotAuthenticate() {
            if (
                user?.message != "Valid client request" &&
                (message === "Not Authenticated" || message === "Session Ended")
            ) {
                dispatch(openModal(undefined));
            }
        }
        const timer = setTimeout(() => {
            //console.log("Modal is open");
            openModalWhenNotAuthenticate();
        }, 3000);

        return () => clearTimeout(timer);
    }, [user]);

  return (
    <>
      <div className="App">
        <div className="bg-white">
          <Navbar />
          <Header handleSelectChange={handleSelectChange} selectedOption={selectedOption} />
          <About planDescription={renderDescription()} />
          <CTA /> 
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;

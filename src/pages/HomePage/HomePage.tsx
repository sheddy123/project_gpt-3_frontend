

import Possibility from "@/components/Possibility/PossibilityComponent/Possibility";
import About from "@/components/About/AboutComponent/About";
import Brand from "@/components/Brand/Brand";
import CTA from "@/components/CTA/CTAComponent/CTA";
import Footer from "@/components/Footer/FooterComponent/Footer";
import "@/styles/index.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "@/components/Navbar/NavbarComponent/Navbar";
import Header from "@/components/Header/HeaderComponent/Header";

const HomePage = () => {
  const user = useSelector((store) => store?.authReducer?.auth_response);

  //console.log("Persist login" + JSON.stringify(user));
  return (
    <>
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
          <Brand />
          <About />
          <Possibility />
          <CTA />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;

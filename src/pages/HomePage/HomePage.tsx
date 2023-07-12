import Possibility from "@/components/Possibility/PossibilityComponent/Possibility";
import About from "@/components/About/AboutComponent/About";
import Brand from "@/components/Brand/Brand";
import CTA from "@/components/CTA/CTAComponent/CTA";
import Footer from "@/components/Footer/FooterComponent/Footer";
import "@/styles/index.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "@/components/Navbar/NavbarComponent/Navbar";
import Header from "@/components/Header/HeaderComponent/Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/redux/features/modal/modalSlice";

const HomePage = () => {
  const user = useSelector((store) => store?.authReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const message = location.state && location.state.message;
  // useEffect(() => {
  //   if(user?.message == "Valid client request"){
  //     dispatch(closeModal(undefined));
  //   }
  //   else if (message === "Not Authenticated") {
  //     console.log("Modal is open");

  //     dispatch(openModal(undefined));
  //   }

  // }, [user]);
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

  //console.log("Persist login" + JSON.stringify(location?.state?.from?.pathname));
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

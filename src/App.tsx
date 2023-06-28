import About from "./components/About/AboutComponent/About";
import Brand from "./components/Brand/Brand";
import CTA from "./components/CTA/CTAComponent/CTA";
import Footer from "./components/Footer/FooterComponent/Footer";
import Header from "./components/Header/HeaderComponent/Header";
import Navbar from "./components/Navbar/NavbarComponent/Navbar";
import Possibility from "./components/Possibility/PossibilityComponent/Possibility";
import "./styles/index.css";

function App() {
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
        {/* <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
     */}
      </div>
    </>
  );
}

export default App;

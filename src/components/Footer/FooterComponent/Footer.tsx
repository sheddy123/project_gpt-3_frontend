import "./Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="gpt3__footer section__padding">
        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
          <div className="gpt3__footer-copyright">
            <p>Copyright Ⓒ {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

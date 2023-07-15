import "./StudentProgressBar.css";

const StudentProgressBar = () => {
  return (
    <>
      <div className="mt-10">
        <div className="container">
          <div className="card">
            <div className="percent">
              <div className="dot"></div>
              <svg>
                <circle cx={70} cy={70} r={70}></circle>
                <circle cx={70} cy={70} r={70}></circle>
              </svg>
              <div className="number dark:text-white text-black">
                <h2 className="dark:text-white text-black">85<span className="dark:text-white text-black">%</span></h2>
                <p className="dark:text-white text-black">Progress</p>
              </div>
            </div>
          </div>
          
        </div>
  

      </div>
    </>
  );
};

export default StudentProgressBar;

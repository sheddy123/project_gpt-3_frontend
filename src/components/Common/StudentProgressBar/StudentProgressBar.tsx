import React, { useState, useEffect } from "react";
import CountUp from "../CountUp/CountUp";
import "./StudentProgressBar.css";

interface StudentProgressBarProps {
  progress: number;
  spanText: string;
  progressText: string;
}

const StudentProgressBar: React.FC<StudentProgressBarProps> = ({
  progress,
  spanText,
  progressText,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const newOffset = 440 - (440 * progress) / 100;
    setOffset(newOffset);
  }, [progress]);

  return (
    <>
      <div className="mt-10">
        <div className="container">
          <div className="card">
            <div
              className="percent"
              // @ts-ignore
              style={{ "--num": `${progress}`, "--offset": offset }}
            >
              <div className="dot"></div>
              <svg>
                <circle cx={70} cy={70} r={70} stroke="#191919"></circle>
                <circle
                  cx={70}
                  cy={70}
                  r={70}
                  style={{ opacity: 1 }}
                ></circle>
              </svg>
              <div className="number dark:text-white text-black">
                <h2 className="dark:text-white text-black">
                  <CountUp start={0} end={progress} duration={2000} />
                  <span className="dark:text-white text-black">{spanText}</span>
                </h2>
                <p className="dark:text-white text-black">{progressText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProgressBar;

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { closeConfetti } from "@/redux/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const DisplayConfetti = () => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const dispatch = useDispatch();
  const modalReducer = useSelector((state:any) => state.modalReducer);
  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    const timer = setTimeout(() => {
      dispatch(closeConfetti(undefined));
    }, 5000);

    return () => {
      window.removeEventListener("resize", detectSize);
      clearTimeout(timer);
    };
  }, [modalReducer.isConfettiOpen, windowDimension]);
  return (
    modalReducer.isConfettiOpen && (
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000}
      />
    )
  );
};

export default DisplayConfetti;

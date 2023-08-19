import { useState, useEffect, useRef } from "react";

const CountUp = ({ start = 0, end, duration = 2000  }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(start);

  //const counter = end / 200;
  const counter = end / (duration / 70); 

  const Count = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + counter);
      if (result > end) return setValue(end);
      setValue(result);
      ref.current = result;
    }
    setTimeout(Count, 70);
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     Count();
  //   }
  //   return () => (isMounted = false);
  // }, [end]);

  useEffect(() => {
    Count();
  }, [end]);
  
  
  return (
    <>{value}</>
  );
};

export default CountUp;
